REPLACE ONLY THESE 4 FILES:

1. hospital-management.html
2. js/hospital.js
3. certificate-view.html
4. js/certificate-view.js

What changes:
- Hospital page gets real State + District dropdown.
- Hospital/Local Body saves district_id, so it appears in Birth/Death registration dropdown.
- Saves English/local authority name, department, officer name, designation and address.
- Uploads State/Authority Logo, Form Logo, Signature and Seal to private Supabase authority-assets bucket.
- Certificate reads those saved authority assets using signed URLs.
- Certificate QR render is hardened.
- Older test certificate state can recover from certificate number prefix such as MH-B-...
- TEST / UNOFFICIAL stays only at the bottom footer.

Important:
- All India district SQL must already be run so district selections have real Supabase district IDs.
