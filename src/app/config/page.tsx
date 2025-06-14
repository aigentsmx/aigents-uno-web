"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, X, Globe, Save, Building2 } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function ConfigPage() {
  const [companyName, setCompanyName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const router = useRouter();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files).filter(
        file => file.type === "application/pdf"
      );
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(
        file => file.type === "application/pdf"
      );
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFileToS3 = async (file: File) => {
    try {
      // Step 1: Get presigned URL from Netlify function
      const urlResponse = await fetch('/.netlify/functions/generate-upload-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          companyName: companyName
        })
      });

      if (!urlResponse.ok) {
        throw new Error('Failed to get upload URL');
      }

      const { uploadUrl, s3Key, companyFolder } = await urlResponse.json();

      // Step 2: Upload file directly to S3
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type
        }
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file to S3');
      }

      return {
        fileName: file.name,
        s3Key,
        companyFolder
      };
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  const handleSave = async () => {
    if (!companyName.trim() || !websiteUrl.trim()) {
      alert('Por favor completa el nombre de la empresa y el sitio web');
      return;
    }

    setIsUploading(true);
    
    try {
      // First, save the company configuration
      console.log('Saving configuration...');
      console.log('Company Name:', companyName.trim());
      console.log('Website URL:', websiteUrl.trim());
      
      const configResponse = await fetch('/.netlify/functions/save-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: companyName.trim(),
          websiteUrl: websiteUrl.trim()
        })
      });

      console.log('Config response status:', configResponse.status);
      console.log('Config response ok:', configResponse.ok);
      
      if (!configResponse.ok) {
        const errorText = await configResponse.text();
        console.error('Config response error:', errorText);
        throw new Error(`Failed to save configuration: ${errorText}`);
      }

      const configResult = await configResponse.json();
      console.log('Config saved successfully:', configResult);

      // Then upload files if any (this will trigger processing automatically)
      if (files.length > 0) {
        console.log('Uploading files to S3...');
        
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          console.log(`Uploading file ${i + 1}/${files.length}:`, file.name);
          setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
          
          try {
            await uploadFileToS3(file);
            setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
            console.log(`File uploaded successfully: ${file.name}`);
          } catch (error) {
            console.error(`Failed to upload ${file.name}:`, error);
            alert(`Error al subir ${file.name}. Por favor intenta de nuevo.`);
            return;
          }
        }
      }
      
      // Success! Redirect to chat with company name
      const sanitizedCompanyName = companyName.trim();
      router.push(`/chat?company=${encodeURIComponent(sanitizedCompanyName)}`);
      
    } catch (error: unknown) {
      console.error('Error saving configuration:', error);
      alert(`Error al guardar la configuración: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsUploading(false);
      setUploadProgress({});
    }
  };

  return (
    <main className="min-h-screen p-8 pt-24">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center space-y-6 mb-20">
          <h1 
            className="text-6xl font-bold bg-gradient-to-r from-[#C75AF6] via-[#F55AFC] to-[#C75AF6] bg-clip-text text-transparent"
            style={{
              textShadow: '0 0 20px rgba(199, 90, 246, 0.5), 0 0 40px rgba(245, 90, 252, 0.3)'
            }}
          >
            Configura tu Agente de Prueba en dos Pasos
          </h1>
          
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#C75AF6] to-[#F55AFC] rounded-full shadow-lg shadow-purple-500/50"></div>
          
          <p className="mt-8 text-xl text-[#f6e6c3] font-medium max-w-2xl mx-auto leading-relaxed">
            1. Proporciona el nombre y sitio web de tu empresa, además de documentos relevantes para dar contexto a tu agente.
          </p>
          <p className="mt-8 text-xl text-[#f6e6c3] font-medium max-w-2xl mx-auto leading-relaxed">
            2. Una vez guardada la configuración, podrás hacer una prueba para chatear con tu agente en la siguiente página.
          </p>
        </div>

        {/* Configuration Form */}
        <div className="space-y-[45px]">
          {/* Company Name Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-[#F55AFC]" />
              <Label htmlFor="companyName" className="text-2xl font-bold text-[#f6e6c3]">
                Nombre de tu Empresa
              </Label>
            </div>
            
            <p className="text-gray-300 text-lg">
              Ingresa el nombre de tu empresa. Esto ayudará al agente a personalizar las respuestas y representar correctamente tu marca.
            </p>
            
            <Input
              id="companyName"
              placeholder="Ejemplo: TechCorp S.A. de C.V."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              maxLength={50}
              className="h-14 bg-black/30 border-[#f6e6c3]/30 text-white placeholder:text-gray-400 focus:border-[#f6e6c3] focus:ring-[#f6e6c3]/20 text-lg"
            />
          </div>

          {/* Website URL Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Globe className="h-8 w-8 text-[#F55AFC]" />
              <Label htmlFor="websiteUrl" className="text-2xl font-bold text-[#f6e6c3]">
                Sitio Web de la Empresa
              </Label>
            </div>
            
            <p className="text-gray-300 text-lg">
              Proporciona la URL del sitio web de tu empresa. Usaremos esta información para entender mejor tu negocio y personalizar las respuestas del agente.
            </p>
            
            <Input
              id="websiteUrl"
              placeholder="https://www.tuempresa.com"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className="h-14 bg-black/30 border-[#f6e6c3]/30 text-white placeholder:text-gray-400 focus:border-[#f6e6c3] focus:ring-[#f6e6c3]/20 text-lg"
              type="url"
            />
          </div>

          {/* File Upload Section */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-[#F55AFC]" />
              <Label className="text-2xl font-bold text-[#f6e6c3]">
                Documentos de la Empresa
              </Label>
            </div>
            
            <p className="text-gray-300 text-lg">
              Sube archivos PDF con información sobre tu empresa, productos, servicios, políticas, etc. Esto ayudará al agente a tener mejor contexto.
            </p>

            {/* Upload Area */}
            <div
              className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-[#F55AFC] bg-[#F55AFC]/10' 
                  : 'border-gray-600 hover:border-[#C75AF6] hover:bg-[#C75AF6]/5'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto h-20 w-20 text-gray-400 mb-6" />
              <p className="text-xl font-medium text-gray-300 mb-3">
                Arrastra archivos PDF aquí o haz clic para seleccionar
              </p>
              <p className="text-gray-400 mb-8">
                Solo se aceptan archivos PDF
              </p>
              <input
                type="file"
                multiple
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <Label htmlFor="file-upload">
                <Button
                  type="button"
                  variant="outline"
                  className="bg-gradient-to-r from-[#C75AF6] to-[#F55AFC] text-white border-none hover:from-[#C75AF6]/80 hover:to-[#F55AFC]/80 h-12 px-8 text-lg"
                >
                  Seleccionar Archivos
                </Button>
              </Label>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-[#f6e6c3]">
                  Archivos seleccionados ({files.length})
                </h4>
                <div className="space-y-3">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-black/30 rounded-xl border border-gray-600"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <FileText className="h-6 w-6 text-[#F55AFC]" />
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-2">
                            <span className="text-white font-medium text-lg">{file.name}</span>
                            <span className="text-gray-400">
                              ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          </div>
                          
                          {/* Progress Bar */}
                          {isUploading && uploadProgress[file.name] !== undefined && (
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-[#C75AF6] to-[#F55AFC] h-2 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress[file.name]}%` }}
                              ></div>
                            </div>
                          )}
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        disabled={isUploading}
                        className="text-gray-400 hover:text-red-400 hover:bg-red-400/10 h-10 w-10 disabled:opacity-50"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Save Button */}
          <div className="flex justify-center py-12">
            <Button
              onClick={handleSave}
              disabled={isUploading}
              size="lg"
              className="group bg-gradient-to-r from-[#8c26d5] via-[#E8A5F9] to-[#f6e6c3] text-black font-bold text-xl w-[350px] h-[70px] rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 hover:from-[#8c26d5] hover:to-[#f9ebc9] flex items-center justify-center hover:shadow-[0_0_25px_#F55AFC] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Save className="mr-3 h-7 w-7" />
              {isUploading ? 'Guardando...' : 'Guardar Configuración'}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
} 