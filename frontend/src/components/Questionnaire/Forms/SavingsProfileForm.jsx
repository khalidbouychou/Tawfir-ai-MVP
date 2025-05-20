import {
  Card,
  CardBody,
  Typography,
  Select,
  Option,
  Checkbox,
} from "@material-tailwind/react";

export default function SavingsProfileForm() {
  return (
    <Card className="w-full">
      <CardBody className="flex flex-col gap-4">
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Profil Épargnant
        </Typography>

        <Select label="Fréquence d'épargne">
          <Option value="jamais">Jamais</Option>
          <Option value="occasionnelle">Occasionnelle</Option>
          <Option value="mensuelle">Mensuelle</Option>
          <Option value="hebdomadaire">Hebdomadaire</Option>
        </Select>

        <Typography variant="h6" color="blue-gray" className="mb-2">
          Objectifs d'épargne
        </Typography>
        
        <div className="flex flex-col gap-2">
          <Checkbox label="Voyage" />
          <Checkbox label="Retraite" />
          <Checkbox label="Sécurité financière" />
          <Checkbox label="Projet immobilier" />
          <Checkbox label="Études" />
          <Checkbox label="Création d'entreprise" />
        </div>
      </CardBody>
    </Card>
  );
}