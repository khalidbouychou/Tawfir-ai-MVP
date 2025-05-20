import {
  Card,
  CardBody,
  Typography,
  Radio,
  Checkbox,
} from "@material-tailwind/react";

export default function ESGPreferencesForm() {
  return (
    <Card className="w-full">
      <CardBody className="flex flex-col gap-4">
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Préférences ESG
        </Typography>

        <Typography variant="h6" color="blue-gray" className="mb-2">
          Critères Environnementaux
        </Typography>
        <div className="flex flex-col gap-2">
          <Radio
            name="environmental"
            label="Je souhaite exclure totalement les entreprises polluantes"
          />
          <Radio
            name="environmental"
            label="Je préfère les entreprises avec une stratégie de transition écologique"
          />
          <Radio
            name="environmental"
            label="L'impact environnemental n'est pas un critère prioritaire"
          />
        </div>

        <Typography variant="h6" color="blue-gray" className="mb-2">
          Critères Sociaux
        </Typography>
        <div className="flex flex-col gap-2">
          <Checkbox label="Importance de la diversité dans l'entreprise" />
          <Checkbox label="Politiques d'inclusion" />
          <Checkbox label="Équité salariale" />
          <Checkbox label="Conditions de travail" />
        </div>

        <Typography variant="h6" color="blue-gray" className="mb-2">
          Critères de Gouvernance
        </Typography>
        <div className="flex flex-col gap-2">
          <Checkbox label="Transparence des pratiques de gestion" />
          <Checkbox label="Éthique des affaires" />
          <Checkbox label="Lutte contre la corruption" />
          <Checkbox label="Indépendance du conseil d'administration" />
        </div>
      </CardBody>
    </Card>
  );
}