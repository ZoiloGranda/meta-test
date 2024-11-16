import React from "react";
import { PhotoWithMetadata } from "@/api/types/Photo";

interface PhotoDataProps {
  photoWithMetadata: PhotoWithMetadata;
}

const PhotoData: React.FC<PhotoDataProps> = ({ photoWithMetadata }) => (
  <div className="flex flex-col">
    <h2 className="mb-4 text-2xl font-bold">Photo Details</h2>
    <p>
      <strong>ID:</strong> {photoWithMetadata.id}
    </p>
    <p>
      <strong>Title:</strong> {photoWithMetadata.title}
    </p>
    <p>
      <strong>URL:</strong> {photoWithMetadata.url}
    </p>
    <p>
      <strong>Thumbnail URL:</strong> {photoWithMetadata.thumbnailUrl}
    </p>

    <h3 className="mb-2 mt-6 text-xl font-semibold">Album Details</h3>
    <p>
      <strong>Album ID:</strong> {photoWithMetadata.album.id}
    </p>
    <p>
      <strong>Title:</strong> {photoWithMetadata.album.title}
    </p>
    <p>
      <strong>User ID:</strong> {photoWithMetadata.album.userId}
    </p>

    <h3 className="mb-2 mt-6 text-xl font-semibold">User Details</h3>
    <p>
      <strong>ID:</strong> {photoWithMetadata.album.user.id}
    </p>
    <p>
      <strong>Name:</strong> {photoWithMetadata.album.user.name}
    </p>
    <p>
      <strong>Username:</strong> {photoWithMetadata.album.user.username}
    </p>
    <p>
      <strong>Email:</strong> {photoWithMetadata.album.user.email}
    </p>
    <p>
      <strong>Phone:</strong> {photoWithMetadata.album.user.phone}
    </p>
    <p>
      <strong>Website:</strong> {photoWithMetadata.album.user.website}
    </p>

    <h4 className="mb-1 mt-4 text-lg font-medium">Address</h4>
    <p>
      <strong>Street:</strong> {photoWithMetadata.album.user.address.street}
    </p>
    <p>
      <strong>Suite:</strong> {photoWithMetadata.album.user.address.suite}
    </p>
    <p>
      <strong>City:</strong> {photoWithMetadata.album.user.address.city}
    </p>
    <p>
      <strong>Zipcode:</strong> {photoWithMetadata.album.user.address.zipcode}
    </p>
    <p>
      <strong>Geo:</strong>
    </p>
    <ul>
      <li>
        <strong>Latitude:</strong>{" "}
        {photoWithMetadata.album.user.address.geo.lat}
      </li>
      <li>
        <strong>Longitude:</strong>{" "}
        {photoWithMetadata.album.user.address.geo.lng}
      </li>
    </ul>

    <h4 className="mb-1 mt-4 text-lg font-medium">Company</h4>
    <p>
      <strong>Name:</strong> {photoWithMetadata.album.user.company.name}
    </p>
    <p>
      <strong>Catch Phrase:</strong>{" "}
      {photoWithMetadata.album.user.company.catchPhrase}
    </p>
    <p>
      <strong>BS:</strong> {photoWithMetadata.album.user.company.bs}
    </p>
  </div>
);

export default PhotoData;
