'use client';

import { useEffect } from 'react';
import { initScript } from '@/lib/legacy/script';

export default function ScriptInitializer() {
  useEffect(() => {
    return initScript();
  }, []);

  return null;
}
