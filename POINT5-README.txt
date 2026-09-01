POINT 5 - ALL INDIA STATE-WISE AUTO LANGUAGE

Implemented:
- Every State/UT is mapped to a default local UI language.
- Selecting a state automatically changes Birth/Death form labels and section headings.
- Supported UI dictionaries: English, Hindi, Marathi, Gujarati, Punjabi, Bengali, Assamese, Odia,
  Telugu, Tamil, Kannada, Malayalam and Urdu.
- Urdu switches the page direction to RTL automatically.
- Certificate heading also uses the state's mapped language.
- State/district/local-body database selection remains Supabase driven.

Important:
- User-entered personal data (name, address, hospital name, etc.) is NOT machine-translated automatically.
  It is stored exactly as entered to avoid changing legal/personal spellings.
- States whose primary language is not yet in the included dictionary use Hindi fallback.
  More local-language dictionaries can be added later without changing the database.
