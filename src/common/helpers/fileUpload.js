/**
 * @param { File } file
 */
export const fileUpload = async (file) => {
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
    console.log(cloudResp)

    return cloudResp.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
