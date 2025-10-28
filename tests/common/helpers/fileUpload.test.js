import { uploadImgOnCloudinary } from "../../../src/common/helpers/uploadImgOnCloudinary";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "danuvwaep",
  api_key: "253231292852747",
  api_secret: "xnuuIYAaLb6auvVKj5EkoBJvh-o",
  secure: true,
});

describe("Pruebas en FileUpload", () => {
  describe("subida y eliminacion de iamgenes", () => {
    let urlFileUpload = "";
    let publicImgId = "";

    beforeAll(async () => {
      const imrUrl =
        "https://r-charts.com/es/miscelanea/procesamiento-imagenes-magick_files/figure-html/importar-imagen-r.png";
      const respImg = await fetch(imrUrl);
      const blobImg = await respImg.blob();
      const fileImg = new File([blobImg], "img.png");
      urlFileUpload = await uploadImgOnCloudinary(fileImg);
      const segmentsUrlFileUpload = urlFileUpload.split("/");
      publicImgId =
        "journal-app/" + segmentsUrlFileUpload.at(-1).replace(".png", "");
    });

    test("subir archivo a cloudinary", () => {
      expect(typeof urlFileUpload).toBe("string");
    });

    test("debe eliminar una imagen previamente creada", async () => {
      const respCloudinary = await cloudinary.api.delete_resources(
        [publicImgId],
        { resource_type: "image" }
      );
      expect(respCloudinary.deleted[publicImgId]).toBe("deleted");
    });
  });

  test("debe de retornar error", async () => {
    const fileimg = new File([], "img.png");
    await expect(uploadImgOnCloudinary(fileimg)).rejects.toThrow(
      /^Error: no se pudo subir img$/
    );
  });
});
