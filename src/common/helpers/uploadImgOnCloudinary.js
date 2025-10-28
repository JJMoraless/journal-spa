/**
 * @param { File } file
 * @returns { Promise<string> }
 * @throws { Error }
 */
export const uploadImgOnCloudinary = async (file) => {
  if (!file) throw new Error("No file ");

  const cloudUrl = `https://api.cloudinary.com/v1_1/danuvwaep/image/upload`;

  const formData = new FormData();
  formData.append("upload_preset", "journal-app-conect"); 
  formData.append("file", file);

  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });

    if (!resp.ok) {
      throw new Error("no se pudo subir img");
    }
    const cloudResp = await resp.json();
    return cloudResp.secure_url;
    
  } catch (error) {
    throw new Error(error);
  }
};
