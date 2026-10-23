# Assets Manifest — SERVO

## الصور

الصور الرئيسية للخدمات **أنشأها المالك** (ليست من Pexels أو أي مصدر خارجي).

### الأصل
- 10 صور أصلية (8 خدمات + hero + join)
- محفوظة في `assets/img/` بأسماء نهائية: `hero.jpg`, `ac.jpg`, `plumbing.jpg`, `electrical.jpg`, `cleaning.jpg`, `pest.jpg`, `carpentry.jpg`, `moving.jpg`, `specialized.jpg`, `join.jpg`
- **`painting.jpg` غير موجودة بعد** — تستخدم صفحة الخدمات تدرجاً بألوان الهوية كبديل مؤقت. عند استلام الصورة، ضعها باسم `painting.jpg` في `assets/img/` وأعد تشغيل سكريبت التحويل `python3 gen-images.py`، دون تعديل الكود.

### المعالجة (في `assets/img/gen/`)
لكل صورة 3 أحجام × صيغتان:
- `480` — عرض 480px (نسخة الجوال)
- `960` — عرض 960px (نسخة حاسوب)
- `1600` — عرض 1600px (نسخة عالية الكثافة)

الصيغ: **AVIF** (الأفضل) و **WebP** (بديل واسع) و **JPG** (احتياطي).

```
gen/hero-480.avif  gen/hero-480.webp  gen/hero-480.jpg
gen/hero-960.avif  gen/hero-960.webp  gen/hero-960.jpg
gen/hero-1600.avif gen/hero-1600.webp gen/hero-1600.jpg
gen/ac-480.avif    gen/ac-480.webp    gen/ac-480.jpg
... إلخ
```

### الأبعاد
| الصورة | النسبة | أصغر (480) | متوسطة (960) | أكبر (1600) |
|---|---|---|---|---|
| hero | أفقية | 480×272 | 960×544 | 1600×907 |
| ac / plumbing / electrical / cleaning / pest / carpentry / moving / specialized | 4:5 عمودية | 480×600 | 960×1200 | 1600×2000 |
| join | أفقية | 480×272 | 960×544 | 1600×907 |

### ملاحظات
- `hero.jpg`: يُقلب أفقياً في CSS (`scaleX(-1)`) حتى تكون الفيلا والفني على اليسار والسماء الهادئة على يمين العنوان.
- `join.jpg`: لا يُقلب — المساحة الفارغة على اليمين للعنوان.
- الصور ليست «من أعمالنا الفعلية» بل **صور توضيحية للخدمات** — لا يوصي أي نص في الموقع بذلك.

## الخطوط
- **العربية**: Noto Kufi Arabic (عناوين) + IBM Plex Sans Arabic (نص)
- **اللاتيني والأرقام**: Montserrat
- مضمّنة محليا في `assets/fonts/` — صفر طلبات خارجية.

## الأيقونات
- مكتبة SVG موحدة في `js/icons.js` (سيتروس 1.5px، بدون fill)
- شعار SERVO: `icons/mark.svg` + favicons في `icons/`

## رقم واتساب
- مخزَّن في `js/config.js` (المتغير `SITE.phone`)
- الظهور في الموقع: `+973 6666 1238`
- الرابط: `https://wa.me/97366661238`
