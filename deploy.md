## BUILD
ng build --configuration production



## DEPLOY EN GOOGLE CLUD

# Construir la imagen
docker build -t mi-angular-app .

# Ejecutar el contenedor en el puerto 4200
docker run -d -p 4200:4200 consultorias-app

docker run -d -p 8080:80 consultorias-app


## Limpia cache
docker builder prune -a

## Valida espacio usado por los builds
docker system df


docker build -t mi-app .
docker run -d -p 4200:80 mi-app


## 1 Instalar Google Cloud SDK
https://cloud.google.com/sdk/docs/install


## 2 Luego iniciar sesion
gcloud auth login

## 3 Selecciona tu proyecto
gcloud config set project TU_ID_PROYECTO

## 4 Habilita el servicio de Artifact Registry
gcloud services enable artifactregistry.googleapis.com

## 5 crear repositorio para las imagenes en google-cloud


## 6 En docker, Etiqueta tu imagen Docker
docker tag mi-app:latest us-central1-docker.pkg.dev/TU_ID_PROYECTO/mi-repo/mi-app:latest
docker tag consultorias-api-prod:latest us-central1-docker.pkg.dev/consultoriasapp/consultoriasrepo/consultorias-api-prod:latest

## 7 Autentica Docker con Google Cloud
gcloud auth configure-docker us-central1-docker.pkg.dev

## 8 Sube la imagen
docker push us-central1-docker.pkg.dev/TU_ID_PROYECTO/mi-repo/mi-app:latest
docker push us-central1-docker.pkg.dev/consultoriasapp/consultoriasrepo/consultorias-api-prod:latest
