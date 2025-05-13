import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface RadioOptionProps {
  name: string;
  value: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
}

interface CheckboxOptionProps {
  name: string;
  value: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
}

interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  leftLabel?: string;
  rightLabel?: string;
}

interface SelectProps {
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
}

export const RadioOption: React.FC<RadioOptionProps> = ({ name, value, label, onChange, checked }) => {
  return (
    <label className="custom-radio">
      <input 
        type="radio" 
        name={name} 
        value={value}
        className="custom-radio-input" 
        onChange={onChange}
        checked={checked}
      />
      <span>{label}</span>
    </label>
  );
};

export const CheckboxOption: React.FC<CheckboxOptionProps> = ({ name, value, label, onChange, checked }) => {
  return (
    <label className="custom-checkbox">
      <input 
        type="checkbox" 
        name={name} 
        value={value}
        className="custom-checkbox-input" 
        onChange={onChange}
        checked={checked}
      />
      <span>{label}</span>
    </label>
  );
};

export const Slider: React.FC<SliderProps> = ({ min, max, value, onChange, leftLabel, rightLabel }) => {
  return (
    <div>
      {(leftLabel || rightLabel) && (
        <div className="mb-2">
          <span className="text-sm text-neutral-500">{leftLabel} ← → {rightLabel}</span>
        </div>
      )}
      <input 
        type="range" 
        min={min} 
        max={max} 
        value={value} 
        onChange={(e) => onChange(Number(e.target.value))}
        className="range-slider mb-2"
      />
      <div className="flex justify-between">
        <span className="text-xs text-neutral-500">{min}</span>
        <span className="text-xs text-neutral-500">{max}</span>
      </div>
    </div>
  );
};

export const Select: React.FC<SelectProps> = ({ name, options, value, onChange, placeholder }) => {
  return (
    <select 
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
    >
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

interface QuestionnaireCardProps {
  title: string;
  children: React.ReactNode;
}

const QuestionnaireCard: React.FC<QuestionnaireCardProps> = ({ title, children }) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-5">
        <h3 className="font-heading font-semibold text-lg mb-4">{title}</h3>
        {children}
      </CardContent>
    </Card>
  );
};

export default QuestionnaireCard;
