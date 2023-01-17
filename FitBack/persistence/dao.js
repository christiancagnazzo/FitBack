import * as SQLite from "expo-sqlite";
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

async function openDatabase() {
    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
    }
    await FileSystem.downloadAsync(
        Asset.fromModule(require('./FitBack.db')).uri,
        FileSystem.documentDirectory + 'SQLite/FitBack.db'
    );

    return SQLite.openDatabase('FitBack.db');
}

export default dao = { openDatabase }

