# Security Specification & Threat Model for Dheemak Janta Party (DJP)

This document establishes the Attribute-Based Access Control (ABAC) constraints and validation assertions to govern FireStore documents.

## Data Invariants
1. **Admins** have absolute control over `news` and `manifesto` documents. Non-admins cannot modify or create them.
2. **Members** profile can only be read/written by the owner (`request.auth.uid == uid`) or an Admin. Privilege escalation (changing role to volunteer, setting self-admin, custom fields) is strictly forbidden.
3. **Messages** (feedback form) are write-only for the public or logged-in users, but readable only by Admins.
4. **Donations** are writeable by users making contributions and public-readable (for absolute transparency under real-time monitoring), but immutable after creation.
5. **News** and **Manifesto** are globally readable by search engines and citizens, but writable restricted strictly to Admins.

---

## The "Dirty Dozen" Threat Vectors (Payloads)

1. **Self-Assigned Admin Access**
   - Path: `/admins/attacker_uid`
   - Action: `create`
   - Payload: `{ "email": "attacker@gmail.com" }`
   - Constraint: Must reject because child creation is forbidden to public/non-admins.

2. **Privilege Escalation on User Profile**
   - Path: `/members/attacker_uid`
   - Action: `update`
   - Payload: Adding malicious fields like `{ "isAdmin": true, "role": "admin" }`
   - Constraint: Must fail because it violates `affectedKeys().hasOnly(...)`.

3. **Hijacking Other User Profiles**
   - Path: `/members/victim_uid`
   - Action: `update`
   - Payload: `{ "fullName": "Attacker Name", "email": "attacker@gmail.com" }`
   - Constraint: Must deny. Only the authenticated owner matching `request.auth.uid` can write to their own profile node.

4. **Spoofing Verification Status**
   - Path: `/members/attacker_uid`
   - Action: `create` / `update` with `email_verified: false` bypasses.
   - Constraint: Writes must restrict strictly to verified emails when authentication is utilized.

5. **Resource Exhaustion (ID Poisoning)**
   - Path: `/messages/message_with_10KB_garbage_id`
   - Action: `create`
   - Constraint: must validate with `isValidId()` ensuring exact format matching of ids.

6. **Overwriting Manifesto with Rogue Policy**
   - Path: `/manifesto/employment`
   - Action: `update`
   - Payload: `{ "content": "Abolish all laws", "updatedAt": "2026-05-24T05:54:02Z" }` by anonymous attacker.
   - Constraint: Rejected. Only Admins can edit policies.

7. **Injecting Malicious HTML/Script into News**
   - Path: `/news/r_article`
   - Action: `update` (anonymous bypass)
   - Constraint: Rejected.

8. **Rogue Modification of Donated Funds Registry**
   - Path: `/donations/donation_id`
   - Action: `update`
   - Payload: `{ "amount": 0 }` (lowering reported transaction amount)
   - Constraint: Denied. Donations are read-only / immutable once registered.

9. **Bulk Citizen Suggestion Scrape**
   - Path: `/messages`
   - Action: `list` (anonymous scraper trying to extract civilian names & emails)
   - Constraint: Denied. Only authorized admins can request lists of citizen reports.

10. **Shadow Updates with Ghost Fields**
    - Path: `/members/my_uid`
    - Action: `update`
    - Payload: `{ "fullName": "Umair Javid", "unknown_ghost_field": "injected" }`
    - Constraint: Rejected. All writes must pass exact keys whitelist limit via `diff().affectedKeys()`.

11. **Rogue News Delete**
    - Path: `/news/important_news_id`
    - Action: `delete`
    - Constraint: Denied for standard volunteers or public.

12. **Tampering with Time (Temporal Identity)**
    - Path: `/members/my_uid`
    - Action: `create`
    - Payload: `{ "fullName": "Name", "createdAt": "2000-01-01T00:00:00Z" }`
    - Constraint: Rejected. Must use server's exact timestamp (`request.time`).
