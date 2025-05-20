import {
  Card,
  CardBody,
  Typography,
  Select,
  Option,
  Input,
  Radio,
} from "@material-tailwind/react";

export default function FinancialProfileForm() {
  return (
    <Card className="w-full">
      <CardBody className="flex flex-col gap-4">
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Profil Financier
        </Typography>

        <Input type="number" label="Revenu mensuel (€)" />
        <Input type="number" label="Dépenses récurrentes mensuelles (€)" />

        <Select label="Capacité d'investissement">
          <Option value="faible">Faible (&lt; 10% du revenu)</Option>
          <Option value="moderee">Modérée (10-30% du revenu)</Option>
          <Option value="elevee">Élevée (&gt; 30% du revenu)</Option>
        </Select>

        <Typography variant="h6" color="blue-gray" className="mb-2">
          Attitude face aux pertes financières
        </Typography>
        <div className="flex flex-col gap-2">
          <Radio name="risk" label="Je ne tolère aucune perte" />
          <Radio name="risk" label="Je peux accepter des pertes limitées" />
          <Radio name="risk" label="Je peux accepter des pertes modérées pour des gains potentiels plus élevés" />
          <Radio name="risk" label="Je peux accepter des pertes importantes pour des gains potentiels très élevés" />
        </div>

        <Select label="Horizon temporel">
          <Option value="court">Court terme (&lt; 2 ans)</Option>
          <Option value="moyen">Moyen terme (2-5 ans)</Option>
          <Option value="long">Long terme (&gt; 5 ans)</Option>
        </Select>
      </CardBody>
    </Card>
  );
}