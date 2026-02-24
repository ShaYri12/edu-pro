import React from 'react';
import { useRouter } from 'expo-router';
import AllCategories from './screens/AllCategories';

export default function AllCategoriesRoute() {
  const router = useRouter();
  return <AllCategories onBack={() => router.back()} />;
}
