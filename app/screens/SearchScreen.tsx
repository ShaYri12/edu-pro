import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ArrowLeft, X, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import SearchBar from '../components/SearchBar';

const STORAGE_KEY = '@search_history_v1';
const MAX_HISTORY = 20;

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);

  // Load history
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const arr = JSON.parse(raw);
          if (Array.isArray(arr)) setHistory(arr.filter((x) => typeof x === 'string'));
        }
      } catch (e) {
        // noop
      }
    })();
  }, []);

  const saveHistory = useCallback(async (items: string[]) => {
    try {
      setHistory(items);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      // noop
    }
  }, []);

  const addToHistory = useCallback(async (text: string) => {
    const term = text.trim();
    if (!term) return;
    const existing = history.filter((t) => t.toLowerCase() !== term.toLowerCase());
    const next = [term, ...existing].slice(0, MAX_HISTORY);
    await saveHistory(next);
  }, [history, saveHistory]);

  const removeFromHistory = useCallback(async (term: string) => {
    const next = history.filter((t) => t !== term);
    await saveHistory(next);
  }, [history, saveHistory]);

  const handleSubmit = useCallback(async () => {
    Keyboard.dismiss();
    await addToHistory(query);
    // TODO: navigate to search results
  }, [addToHistory, query]);

  const dataToRender = useMemo(() => (showAll ? history : history.slice(0, 8)), [history, showAll]);

  return (
    <View className="flex-1 bg-[#F5F9FF]">
      <ScrollView
        className="flex-1 px-8 py-8"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"   // ← important when keyboard is open
      >
        {/* Header */}
        <View className="flex-row items-center mb-[20px]">
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
            <ArrowLeft size={24} color="#0B1354" />
          </TouchableOpacity>
          <Text className="ml-3 text-dark-blue font-jost-semibold text-[21px]">Search</Text>
        </View>

        {/* Search Bar */}
        <SearchBar
          placeholder="Graphic Design"
          onSearch={setQuery}
          onSubmitEditing={handleSubmit}
          autoFocus
        />

        {/* Recents Header */}
        <View className="mt-[24px] flex-row items-center justify-between">
          <Text className="text-dark-blue font-jost-semibold text-[15px]">Recents Search</Text>
          {history.length > 8 && (
            <TouchableOpacity
              onPress={() => setShowAll((s) => !s)}
              activeOpacity={0.7}
              className="flex-row items-center"
            >
              <Text className="text-primary font-mulish-extrabold text-[12px]">
                {showAll ? 'SHOW LESS' : 'SEE ALL'}
              </Text>
              <ChevronRight size={18} color="#0961F5" />
            </TouchableOpacity>
          )}
        </View>

        {/* History Items */}
        <View className="mt-[30px] gap-y-[30px]">
          {dataToRender.length > 0 ? (
            dataToRender.map((item, index) => (
              <View key={`${item}-${index}`} className="flex-row items-center justify-between">
                <TouchableOpacity
                  className="flex-1 pr-3 active:opacity-80"
                  onPress={() => {
                    setQuery(item);
                    // handleSubmit(); // uncomment if you want instant search
                  }}
                >
                  <Text className="text-light-gray text-[15px]">{item}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => removeFromHistory(item)} activeOpacity={0.7}>
                  <X size={18} color="#472D2D" />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text className="mt-3 text-light-gray text-[14px]">No recent searches</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}