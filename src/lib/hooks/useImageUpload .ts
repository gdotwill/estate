
import { storage } from "@/lib/firebase";
import { useState, useEffect, useRef } from "react";
import { ref, StorageReference, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { v4 } from "uuid";

type UseImageUploadReturnType = {
    imageUpload: File | null;
    imgLink: string;
    fileRef: React.RefObject<HTMLInputElement>;
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    uploadFile: () => void;
};

const useImageUpload = (): UseImageUploadReturnType => {
    const [imageUpload, setImageUpload] = useState<File | null>(null);
    const [imgLink, setImgLink] = useState("");
    const imagesListRef: StorageReference = ref(storage, "images/");
    const fileRef = useRef<HTMLInputElement>(null);

    const uploadFile = async () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

        try {
            const snapshot = await uploadBytes(imageRef, imageUpload);
            const url = await getDownloadURL(snapshot.ref);
            setImgLink((prev) => url);
        } catch (error) {
            console.log("An error occurred:", error);
        }
    };

    const fetchImages = async () => {
        try {
            const response = await listAll(imagesListRef);
            const urls = await Promise.all(response.items.map((item) => getDownloadURL(item)));
            setImgLink((prev) => urls.join(","));
        } catch (error) {
            console.log("An error occurred:", error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, [imageUpload]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files === null) return;
        setImageUpload(e.target.files[0]);
        e.target.value = "";
    };

    return { imageUpload, imgLink, fileRef, handleImageUpload, uploadFile };
};

export default useImageUpload;
