from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, ImageOps
import io
import base64
import json

# FastAPI uygulaması başlatılıyor
app = FastAPI()

# CORS Middleware ekleniyor (Frontend ile bağlantı için)
# CORS, Cross-Origin Resource Sharing anlamına gelir ve frontend'in backend ile iletişim kurabilmesini sağlar
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Tüm domainlerden gelen taleplere izin verir
    allow_credentials=True,  # Çerezlere erişime izin verir
    allow_methods=["*"],  # Tüm HTTP metodlarına izin verir (GET, POST, PUT, DELETE vb.)
    allow_headers=["*"],  # Tüm başlıklara izin verir
)

@app.post("/upload/")
async def upload_file(
    file: UploadFile = File(...),  # Yüklenen fotoğraf
    width: int = Form(100),  # Fotoğrafın istenilen genişliği
    height: int = Form(100),  # Fotoğrafın istenilen yüksekliği
    rotation: int = Form(0),  # Fotoğrafın döndürülme açısı
    flip: bool = Form(False),  # Fotoğrafın yatayda çevrilip çevrilmeyeceği
    crop: str = Form("{}")  # Kırpma bilgisi (x, y, width, height)
):
    try:
        # Yüklenen fotoğrafı al ve RGB formatında aç
        image = Image.open(file.file).convert("RGB")

        # Kırpma işlemi
        crop_values = json.loads(crop)  # Kırpma bilgilerini JSON formatından çöz
        # Eğer geçerli kırpma parametreleri varsa, kırpma işlemini uygula
        if all(k in crop_values for k in ["x", "y", "width", "height"]):
            x1, y1 = crop_values["x"], crop_values["y"]
            x2, y2 = x1 + crop_values["width"], y1 + crop_values["height"]
            image = image.crop((x1, y1, x2, y2))  # Kırpma işlemi

        # Fotoğrafı yeniden boyutlandır
        image = image.resize((width, height))  # Boyutları (width, height) ile güncelle

        # Döndürme işlemi
        image = image.rotate(rotation, expand=True)  # Fotoğrafı verilen açı kadar döndür

        # Ayna çevirme işlemi (Yatayda çevirmek için)
        if flip:
            image = ImageOps.mirror(image)  # Fotoğrafı yatayda çevir

        # Fotoğrafı base64 formatına dönüştür
        output = io.BytesIO()  # Bellekte geçici bir dosya
        image.save(output, format="PNG")  # Fotoğrafı PNG formatında kaydet
        output.seek(0)  # Dosya başına git
        encoded_image = base64.b64encode(output.getvalue()).decode()  # Base64'e dönüştür

        # Başarılı yanıtı döndür
        return JSONResponse(content={
            "message": "Resim başarıyla işlendi.",
            "modified_image_url": f"data:image/png;base64,{encoded_image}"  # Base64 kodlanmış resim URL'si
        })

    except Exception as e:
        # Hata durumunda yanıt döndür
        return JSONResponse(status_code=400, content={"message": f"Hata: {str(e)}"})  # Hata mesajı döndür
