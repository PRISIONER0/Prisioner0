import os
from PIL import Image

# Carpeta actual
directorio_actual = '.'

# Recorrer todos los archivos de la carpeta
for archivo in os.listdir(directorio_actual):
    if archivo.lower().endswith('.png'):
        nombre_sin_extension, _ = os.path.splitext(archivo)
        
        # Abrir la imagen PNG y guardarla como WebP
        with Image.open(archivo) as img:
            # Convertir a RGB si el PNG tiene transparencias para evitar errores, o dejarlo en RGBA si lo soporta
            img.save(f"{nombre_sin_extension}.webp", "WEBP", quality=80)
        print(f"Convertido con éxito: {archivo} -> {nombre_sin_extension}.webp")

print("¡Proceso terminado!")
