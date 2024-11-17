import React from "react";
import { PhotoWithMetadata } from "@/models/Photo";
import InfoSection from "@/app/components/InfoSection";
import InfoItem from "@/app/components/InfoItem";

interface PhotoDataProps {
  photoWithMetadata: PhotoWithMetadata;
}

const PhotoData: React.FC<PhotoDataProps> = ({ photoWithMetadata }) => {
  const { album } = photoWithMetadata;
  const { user } = album;
  const { address, company } = user;

  return (
    <div className="flex flex-col">
      <InfoSection title="Photo Details" level="h2">
        <InfoItem label="ID" value={photoWithMetadata.id} />
        <InfoItem label="Title" value={photoWithMetadata.title} />
        <InfoItem label="URL" value={photoWithMetadata.url} />
        <InfoItem
          label="Thumbnail URL"
          value={photoWithMetadata.thumbnailUrl}
        />
      </InfoSection>

      <InfoSection title="Album Details" level="h3">
        <InfoItem label="Album ID" value={album.id} />
        <InfoItem label="Title" value={album.title} />
        <InfoItem label="User ID" value={album.userId} />
      </InfoSection>

      <InfoSection title="User Details" level="h3">
        <InfoItem label="ID" value={user.id} />
        <InfoItem label="Name" value={user.name} />
        <InfoItem label="Username" value={user.username} />
        <InfoItem label="Email" value={user.email} />
        <InfoItem label="Phone" value={user.phone} />
        <InfoItem label="Website" value={user.website} />
      </InfoSection>

      <InfoSection title="Address" level="h4">
        <InfoItem label="Street" value={address.street} />
        <InfoItem label="Suite" value={address.suite} />
        <InfoItem label="City" value={address.city} />
        <InfoItem label="Zipcode" value={address.zipcode} />
        <strong>Geo:</strong>
        <ul>
          <li>
            <strong>Latitude:</strong> {address.geo.lat}
          </li>
          <li>
            <strong>Longitude:</strong> {address.geo.lng}
          </li>
        </ul>
      </InfoSection>

      <InfoSection title="Company" level="h4">
        <InfoItem label="Name" value={company.name} />
        <InfoItem label="Catch Phrase" value={company.catchPhrase} />
        <InfoItem label="BS" value={company.bs} />
      </InfoSection>
    </div>
  );
};

export default PhotoData;
