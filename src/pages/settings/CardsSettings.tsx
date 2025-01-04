import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { AddCardDialog } from "@/components/cards/AddCardDialog";
import type { Card as CardType } from '@/types/financial';

// This will be implemented later when integrating with the APIs
const useCards = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const isLoading = false;
  const error = null;

  // Placeholder for future API integration
  const refreshCards = async () => {
    console.log('This will refresh cards from Monite');
  };

  return { cards, isLoading, error, refreshCards };
};

const CardsSettings = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const { cards, isLoading, error, refreshCards } = useCards();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // This will be implemented when integrating with the APIs
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Success",
        description: "Card settings have been successfully saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save card settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-500">Error loading cards: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Cards</h1>
          <p className="text-gray-500 mt-2">Manage your payment cards.</p>
        </div>
        <div className="flex gap-4">
          <AddCardDialog />
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save changes'
            )}
          </Button>
        </div>
      </div>
      
      <Card className="p-6 space-y-8 bg-white/50">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : cards.length === 0 ? (
          <div className="text-sm text-gray-500">No cards added yet.</div>
        ) : (
          <div className="space-y-4">
            {cards.map((card) => (
              <div key={card.id} className="p-4 border rounded-lg">
                <div className="font-medium">{card.cardholderName}</div>
                <div className="text-sm text-gray-500">
                  {card.cardType.toUpperCase()} •••• {card.lastFour}
                </div>
                <div className="text-sm text-gray-500">
                  Expires: {card.expiryMonth}/{card.expiryYear}
                </div>
                <div className="text-sm text-gray-500">
                  Status: {card.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default CardsSettings;