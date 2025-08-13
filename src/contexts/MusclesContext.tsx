"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Muscle } from "@/types/Muscle";
import { getMuscles } from "@/server/muscles/musclesDataFunctions";

export type MusclesContextValue = {
  muscles: Muscle[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  getById: (id: string | number) => Muscle | undefined;
};

const MusclesContext = createContext<MusclesContextValue | undefined>(undefined);

export const MusclesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [muscles, setMuscles] = useState<Muscle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMuscles();
      setMuscles((data as Muscle[]) ?? []);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to load muscles";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const refresh = useCallback(async () => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("muscles");
      }
    } catch (err) {
      // ignore localStorage errors (quota/availability)
      console.warn("Failed to clear muscles cache", err);
    }
    await load();
  }, [load]);

  const getById = useCallback(
    (id: string | number) => {
      const key = id.toString();
      return muscles.find((m) => m.id?.toString() === key);
    },
    [muscles]
  );

  return (
    <MusclesContext.Provider value={{ muscles, loading, error, refresh, getById }}>
      {children}
    </MusclesContext.Provider>
  );
};

export const useMuscles = (): MusclesContextValue => {
  const ctx = useContext(MusclesContext);
  if (!ctx) throw new Error("useMuscles must be used within a MusclesProvider");
  return ctx;
};
