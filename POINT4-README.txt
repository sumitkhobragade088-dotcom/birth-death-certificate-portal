POINT 4 COMPLETE CERTIFICATE SYSTEM
- Birth registration -> Supabase
- Death registration -> Supabase
- Automatic state/type/year certificate numbering via next_certificate_number()
- All certificates/search
- Duplicate/Reprint action logging
- Certificate view + browser Print/Save PDF
- QR code generated from public verification URL
- Public verification via verify_certificate RPC
- Admin auth/RLS retained

Important: browser Print/Save PDF creates the printable PDF locally. Automatic PDF upload to the private
certificate-pdfs Storage bucket is not included because a browser-generated PDF file must first be produced/uploaded.
The printable certificate is intentionally marked DEMO / UNOFFICIAL for development use.
