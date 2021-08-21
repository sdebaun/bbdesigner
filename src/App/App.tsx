import React from 'react';
import { AppStateProvider } from './AppState'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AppLayout } from './AppLayout';

export const App: React.FC = () =>
  <AppStateProvider>
    <DndProvider backend={HTML5Backend}>
      <AppLayout/>
    </DndProvider>
  </AppStateProvider>