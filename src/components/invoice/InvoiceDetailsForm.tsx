import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InvoiceData } from '@/types/invoice';

interface InvoiceDetailsFormProps {
  data: InvoiceData;
  onChange: (field: keyof InvoiceData, value: any) => void;
}

const InvoiceDetailsForm: React.FC<InvoiceDetailsFormProps> = ({ data, onChange }) => {
  const handleAddItem = () => {
    const newItems = [...data.items, { description: '', quantity: 1, price: 0 }];
    onChange('items', newItems);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = data.items.filter((_, i) => i !== index);
    onChange('items', newItems);
  };

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const newItems = [...data.items];
    newItems[index] = {
      ...newItems[index],
      [field]: value
    };
    onChange('items', newItems);
  };

  return (
    <div className="space-y-6">
      <div>
        <Label>Currency</Label>
        <Select
          value={data.currency}
          onValueChange={(value) => onChange('currency', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">USD - US Dollar</SelectItem>
            <SelectItem value="EUR">EUR - Euro</SelectItem>
            <SelectItem value="GBP">GBP - British Pound</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <Label>Items</Label>
        {data.items.map((item, index) => (
          <div key={index} className="flex gap-4 items-start">
            <div className="flex-grow">
              <Input
                placeholder="Item description"
                value={item.description}
                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
              />
            </div>
            <div className="w-24">
              <Input
                type="number"
                min="1"
                placeholder="Qty"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
              />
            </div>
            <div className="w-32">
              <Input
                type="number"
                min="0"
                step="0.01"
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleRemoveItem(index)}
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          onClick={handleAddItem}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>

      <div>
        <Label htmlFor="note">Note</Label>
        <Input
          id="note"
          placeholder="Add a note (optional)"
          value={data.note}
          onChange={(e) => onChange('note', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="discount">Discount</Label>
          <Input
            id="discount"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={data.discount}
            onChange={(e) => onChange('discount', parseFloat(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="tax">Tax (%)</Label>
          <Input
            id="tax"
            type="number"
            min="0"
            max="100"
            step="0.1"
            placeholder="0"
            value={data.tax}
            onChange={(e) => onChange('tax', parseFloat(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailsForm;