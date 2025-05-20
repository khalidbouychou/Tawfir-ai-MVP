import {
  Card,
  CardBody,
  Typography,
  Select,
  Option,
  Radio,
} from "@material-tailwind/react";

export default function InvestorProfileForm() {
  return (
    <Card className="w-full">
      <CardBody className="flex flex-col gap-4">
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Profil Investisseur
        </Typography>

        <Typography variant="h6" color="blue-gray" className="mb-2">
          Expérience d'investissement
        </Typography>
        
        <Select label="Expérience en immobilier">
          <Option value="aucune">Aucune expérience</Option>
          <Option value="debutant">Débutant</Option>
          <Option value="intermediaire">Intermédiaire</Option>
          <Option value="expert">Expert</Option>
        </Select>

        <Select label="Expérience en actions">
          <Option value="aucune">Aucune expérience</Option>
          <Option value="debutant">Débutant</Option>
          <Option value="intermediaire">Intermédiaire</Option>
          <Option value="expert">Expert</Option>
        </Select>

        <Select label="Expérience en obligations">
          <Option value="aucune">Aucune expérience</Option>
          <Option value="debutant">Débutant</Option>
          <Option value="intermediaire">Intermédiaire</Option>
          <Option value="expert">Expert</Option>
        </Select>

        <Typography variant="h6" color="blue-gray" className="mb-2">
          Réaction aux baisses de marché
        </Typography>
        <div className="flex flex-col gap-2">
          <Radio name="market-reaction" label="Je vends immédiatement pour limiter les pertes" />
          <Radio name="market-reaction" label="J'attends et observe l'évolution" />
          <Radio name="market-reaction" label="Je profite pour investir davantage" />
        </div>

        <Typography variant="h6" color="blue-gray" className="mb-2">
          Influence sociale sur vos décisions
        </Typography>
        <div className="flex flex-col gap-2">
          <Radio name="social-influence" label="Je suis fortement influencé par l'avis des autres" />
          <Radio name="social-influence" label="Je prends en compte les avis mais décide seul" />
          <Radio name="social-influence" label="Je prends mes décisions de manière totalement indépendante" />
        </div>
      </CardBody>
    </Card>
  );
}