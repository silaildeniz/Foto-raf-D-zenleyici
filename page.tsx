'use client';

import { useState } from 'react';
import './globals.css';

export default function Page() {
  // Durumları tanımlıyoruz
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // Yüklenen fotoğraf
  const [imageURL, setImageURL] = useState<string | null>(null); // Düzenlenen fotoğrafın URL'si
  const [width, setWidth] = useState(100); // Fotoğrafın genişliği
  const [height, setHeight] = useState(100); // Fotoğrafın yüksekliği
  const [rotation, setRotation] = useState(0); // Fotoğrafın döndürülme açısı
  const [flip, setFlip] = useState(false); // Fotoğrafın yatayda çevrilip çevrilmeyeceği
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 100, height: 100 }); // Kırpma işlemi için koordinatlar

  // Fotoğraf yükleme işlemi
  const handleUpload = async () => {
    if (!selectedImage) return; // Eğer fotoğraf seçilmediyse işleme devam etme

    const formData = new FormData();
    formData.append('file', selectedImage); // Fotoğrafı form verisi olarak ekle
    formData.append('width', width.toString()); // Genişliği form verisine ekle
    formData.append('height', height.toString()); // Yüksekliği form verisine ekle
    formData.append('rotation', rotation.toString()); // Döndürmeyi form verisine ekle
    formData.append('flip', flip.toString()); // Çevirme bilgisini form verisine ekle
    formData.append('crop', JSON.stringify(crop)); // Kırpma bilgilerini form verisine ekle

    try {
      // Fotoğrafı yükle
      const response = await fetch('http://127.0.0.1:8000/upload/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json(); // Eğer başarılıysa gelen cevabı işle
        setImageURL(result.modified_image_url); // Düzenlenmiş fotoğraf URL'sini state'e aktar
      } else {
        console.error('Upload failed:', await response.json()); // Yükleme başarısızsa hata mesajını göster
      }
    } catch (error) {
      console.error('Error:', error); // Hata durumunda konsola hata yazdır
    }
  };

  return (
    <div className="container">
      <h1>Fotoğraf Yükleyin ve Düzenleyin</h1>
      {/* Fotoğraf yüklemek için input */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setSelectedImage(e.target.files ? e.target.files[0] : null)} // Fotoğraf seçildiğinde state'i güncelle
      />
      
      {selectedImage && (
        // Fotoğraf seçildiyse düzenleme kontrol butonları gösterilsin
        <div className="controls">
          {/* Boyut girdisi */}
          <div>
            <label>Boyut (Width x Height):</label>
            <input 
              type="text" 
              value={width === 0 ? "" : width} 
              onChange={(e) => setWidth(e.target.value ? Number(e.target.value) : 0)} // Genişliği güncelle
              placeholder="Width" 
            />
            <input 
              type="text" 
              value={height === 0 ? "" : height} 
              onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : 0)} // Yüksekliği güncelle
              placeholder="Height" 
            />
          </div>

          {/* Döndürme girdisi */}
          <div>
            <label>Döndürme:</label>
            <input 
              type="text" 
              value={rotation === 0 ? "" : rotation} 
              onChange={(e) => setRotation(e.target.value ? Number(e.target.value) : 0)} // Döndürmeyi güncelle
              placeholder="Rotation" 
            />
          </div>

          {/* Çevirme kutusu */}
          <div>
            <label>Çevirme:</label>
            <input 
              type="checkbox" 
              checked={flip} 
              onChange={(e) => setFlip(e.target.checked)} // Çevirme kutusunun durumunu güncelle
            />
          </div>

          {/* Kırpma girdileri */}
          <div>
            <label>Kırpma:</label>
            <input 
              type="text" 
              value={crop.x === 0 ? "" : crop.x} 
              onChange={(e) => setCrop({ ...crop, x: e.target.value ? Number(e.target.value) : 0 })} // X koordinatını güncelle
              placeholder="Crop X" 
            />
            <input 
              type="text" 
              value={crop.y === 0 ? "" : crop.y} 
              onChange={(e) => setCrop({ ...crop, y: e.target.value ? Number(e.target.value) : 0 })} // Y koordinatını güncelle
              placeholder="Crop Y" 
            />
            <input 
              type="text" 
              value={crop.width === 0 ? "" : crop.width} 
              onChange={(e) => setCrop({ ...crop, width: e.target.value ? Number(e.target.value) : 0 })} // Genişliği güncelle
              placeholder="Crop Width" 
            />
            <input 
              type="text" 
              value={crop.height === 0 ? "" : crop.height} 
              onChange={(e) => setCrop({ ...crop, height: e.target.value ? Number(e.target.value) : 0 })} // Yüksekliği güncelle
              placeholder="Crop Height" 
            />
          </div>

          {/* Yükle ve düzenle butonu */}
          <button onClick={handleUpload}>Yükle ve Düzenle</button>
        </div>
      )}

      {/* Düzenlenmiş fotoğraf önizlemesi */}
      {imageURL && (
        <div className="imagePreview">
          <h2>Düzenlenmiş Fotoğraf</h2>
          <img src={imageURL} alt="Modified" style={{ maxWidth: "100%", border: "1px solid #ccc" }} />
        </div>
      )}
    </div>
  );
}
