# خطوط الموقع — مستضفّة محلياً

كل الخطوط MIT/OFL (حقوق مفتوحة بالكامل). النسخ في هذا المجلد مولّدة آلياً من
المتغيرات الأصلية على Google Fonts عبر `work/subset-fonts.py`:

| العائلة | الأوزان | الواجهة | الترخيص |
|---|---|---|---|
| Noto Kufi Arabic | 400, 600, 700 | العناوين العربية | SIL OFL 1.1 |
| IBM Plex Sans Arabic | 400, 500, 600 | النص العربي | SIL OFL 1.1 |
| Montserrat | 400, 500, 600, 700 | اللاتيني + الأرقام | SIL OFL 1.1 |

كل عائلة مقسمة إلى وجهين:
- `-arabic.woff2` — النطاق العربي + الأرقام اللاتينية الأساسية (unicode-range عربي).
- `-latin.woff2` — اللاتيني فقط (unicode-range لاتيني).

الـ `unicode-range` مذكور في `_manifest.json` ومولّد من cmap كل ملف فعلياً.

إعادة التوليد: `python3 work/subset-fonts.py assets/fonts/`
