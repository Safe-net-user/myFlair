import { getAllAdditionalServices } from '@/data/additional-service';

export default async function AdditionalServices() {
  const additionalServices = (await getAllAdditionalServices()) || [];

  return (
    <ul>
      {additionalServices.map((additionalService) => (
        <li key={additionalService.id}>{additionalService.id}</li>
      ))}
    </ul>
  );
}
