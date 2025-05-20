import {
  Card,
  CardBody,
  Typography,
  Select,
  Option,
  Input,
} from "@material-tailwind/react";

export default function KYCForm() {
  return (
    <Card className="w-full">
      <CardBody className="flex flex-col gap-4">
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Connaissance Client (KYC)
        </Typography>
        
        <Input type="number" label="Âge" />
        
        <Select label="Genre">
          <Option value="homme">Homme</Option>
          <Option value="femme">Femme</Option>
          <Option value="autre">Autre</Option>
        </Select>

        <Select label="Situation familiale">
          <Option value="celibataire">Célibataire</Option>
          <Option value="marie">Marié(e)</Option>
          <Option value="divorce">Divorcé(e)</Option>
          <Option value="veuf">Veuf/Veuve</Option>
        </Select>

        <Select label="Zone d'habitation">
          <Option value="urbaine">Zone urbaine</Option>
          <Option value="rurale">Zone rurale</Option>
          <Option value="periurbaine">Zone périurbaine</Option>
        </Select>

        <Select label="Niveau d'études">
          <Option value="bac">Baccalauréat</Option>
          <Option value="bac+2">Bac+2</Option>
          <Option value="bac+3">Bac+3 (Licence)</Option>
          <Option value="bac+5">Bac+5 (Master)</Option>
          <Option value="doctorat">Doctorat</Option>
          <Option value="autre">Autre</Option>
        </Select>
      </CardBody>
    </Card>
  );
}