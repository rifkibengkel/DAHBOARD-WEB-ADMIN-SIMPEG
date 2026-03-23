import { isAxiosError } from "axios";
import { ImageLoaderProps } from "next/image";

export const handleCurrency = (request: number, numberOnly?: true) => {
  return new Intl.NumberFormat("id-ID", numberOnly ? {} : { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(request);
};

export const handleUppercase = (request: string) => {
  if (!request) return "";

  const splitRequest = request.toLowerCase().split(/\s/g);
  const result: string[] = [];

  splitRequest.forEach((value) => {
    result.push(value.charAt(0).toUpperCase() + value.slice(1));
  });

  return result.join(" ");
};

export const handleImageLoader = (img: ImageLoaderProps) => {
  return `${img.src}?w=${img.width}&q=${50}`;
};

export const handleException = (error: unknown) => {
  if (isAxiosError(error)) {
    return {
      status: error.response?.status || 500,
      data: error.response?.data,
    };
  }
  return Promise.reject(error);
};

export const handleAddress = async (lat: number, lng: number) => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=id`);
    const data = await response.json();
    return data.display_name;
  } catch (error) {
    return "Error mendapatkan alamat";
  }
};
