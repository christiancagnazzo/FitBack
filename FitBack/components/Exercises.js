import { View, Text, Image, ScrollView, TouchableWithoutFeedback, Pressable } from 'react-native';
import { React, useEffect, useState } from "react";
import { SearchBar } from 'react-native-elements';
import { styles } from "../styles.js";
import DraggablePanel from 'react-native-draggable-panel';
import Checkbox from 'expo-checkbox';
import dao from '../persistence/dao.js';

/*const HardCodedExercise = [
    {
        "title": "PUSH-UPS",
        "difficulty": "Novice",
        "score": undefined,
        "icon": require("../assets/pushup.png")
    },
    {
        "title": "BENCH PRESS",
        "difficulty": "Novice",
        "score": "50%",
        "icon": require("../assets/bench.png")
    },
    {
        "title": "SQUAT",
        "difficulty": "Advanced",
        "score": "90%",
        "icon": require("../assets/squat.png")
    },
    {
        "title": "LATERAL-LUNGES",
        "difficulty": "Super Novice",
        "score": undefined,
        "icon": require("../assets/lunges.png")
    }
]*/

function Exercise(props) {
    const [pageType, setPageType] = useState(props.route.params.type) // props
    const [search, setSearch] = useState({ text: "" })
    const [exercises, setExercise] = useState([]) 
    const [displayedExercises, setDisplayedExercise] = useState([]) 

    useEffect(() => {
        const getExercises = async (type) => {
            const db = await dao.openDatabase()
            db.transaction((tx) => {
                tx.executeSql(
                    `select * from exercises`,
                    [], // param
                    (_, result) => {
                        setExercise(result.rows._array)
                        setDisplayedExercise(result.rows._array)
                    },
                    (_, error) => console.log(error)
                );
            })
        }
        
        getExercises("all");
    }, [])

    function updateSearch(text) {
        setSearch({ text });
        setDisplayedExercise(() => exercises.filter((e) => e.title.toUpperCase().startsWith(text.toUpperCase())))
    };

    return (
        <View>

            <Text style={{ fontSize: 50, margin: 10, textAlign: "center", fontWeight: "bold", fontFamily: "BebasNeue" }}>{pageType}</Text>
            <View>
                <SearchBar
                    inputContainerStyle={{ height: 30 }}
                    containerStyle={{ borderRadius: 5, margin: 5 }}
                    placeholder="Search"
                    onChangeText={updateSearch}
                    value={search.text}
                />
            </View>

            <Text style={{ fontSize: 24, margin: 10, textAlign: "center", fontFamily: "BebasNeue" }}>Filters</Text>
            <Filters setExercises={setExercise}></Filters>


            <ScrollView style={{ marginTop: 5 }}>
                {
                    displayedExercises.map((e, i) => <ExerciseCard key={i} exercise={e}></ExerciseCard>)
                }
            </ScrollView>
        </View>
    );
}

function getImage(image){ // to fix
    switch (image){
        case 'squat':
            return require('../assets/squat.png')
        // add other cases
    }
}

function ExerciseCard(props) {
    return (
        <View style={styles.exerciseCard}>
            <View style={{ alignItems: 'center', flexDirection: 'row', flex: 1 }}>
                <View style={{ width: 100, height: 100, margin: 15, borderRadius: 10, backgroundColor: "white" }}>
                    <Image style={{ width: 100, height: 100, borderRadius: 10 }} source={getImage(props.exercise.image_path)} ></Image>
                </View>
                <View>
                    <View style={{ flexDirection: 'row', margin: 3 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 32, fontFamily: "BebasNeue" }}>{props.exercise.title}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', margin: 3 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 14 }}>Difficulty: </Text>
                        <Text style={{ fontSize: 14 }}>{props.exercise.difficulty}</Text>
                    </View>
                    {
                        props.exercise.score === undefined ? null :
                            <View style={{ flexDirection: 'row', margin: 3 }}>
                                <Text style={{ fontWeight: "bold", fontSize: 14 }}>Your Score: </Text>
                                <Text style={{ fontSize: 14 }}>{props.exercise.score}</Text>
                            </View>
                    }

                </View>
            </View>
        </View>
    )

}

function Filters(props) {
    const btstyles = {
        cancel_button: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 4,
            elevation: 3,
            backgroundColor: 'grey',
            marginTop: 30,
            marginRight: 20
        },
        apply_button: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 4,
            elevation: 3,
            backgroundColor: 'black',
            marginTop: 30
        },
        text: {
            fontSize: 16,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: 'white',
        },
    };

    let [filterType, setFilterType] = useState("");
    let [difficulty, setDifficulty] = useState([]);
    let [muscle, setMuscle] = useState([]);
    let [equipment, setEquipment] = useState([]);
    let [prevDifficulty, setPrevDifficulty] = useState([]);
    let [prevMuscle, setPrevMuscle] = useState([]);
    let [prevEquipment, setPrevEquipment] = useState([]);

    return (
        <>

            {/*<ScrollView horizontal={true}>*/}

            <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'center', alignItems: 'center', }}>
                <TouchableWithoutFeedback onPress={() => setFilterType("equipment")}>
                    <View style={styles.filterCard}>
                        <Text style={{ fontSize: 18, textAlign: "center", marginTop: 10, fontFamily: "BebasNeue" }}>Equipment</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => setFilterType("muscle")}>
                    <View style={styles.filterCard}>
                        <Text style={{ fontSize: 18, textAlign: "center", marginTop: 10, fontFamily: "BebasNeue" }}>Muscle Group</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => setFilterType("difficulty")}>
                    <View style={styles.filterCard}>
                        <Text style={{ fontSize: 18, textAlign: "center", marginTop: 10, fontFamily: "BebasNeue" }}>Difficulty</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>

            {/* <TouchableWithoutFeedback onPress={() => setFilterType("equipment")}>
                    <View style={styles.filterCard}>
                        <Text style={{ fontSize: 18, textAlign: "center", marginTop: 10, fontFamily: "BebasNeue" }}>Equipment</Text>
                    </View>
                </TouchableWithoutFeedback>*/}

            {/*</ScrollView>*/}

            {filterType === 'difficulty' ?

                <DraggablePanel borderRadius={10} visible={filterType !== ""} onDismiss={() => setFilterType("")}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ margin: 10, fontWeight: "bold", fontSize: 40, fontFamily: "BebasNeue" }}>Difficulty</Text>
                    </View>

                    <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'center', alignItems: 'center', }}>
                        <View style={{ marginRight: 20 }}>
                            <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                                <Checkbox style={{ width: 30, height: 30 }} value={difficulty.includes("Super Novice")} onValueChange={(e) => setDifficulty((d) => {
                                    if (difficulty.includes("Super Novice"))
                                        return d.filter((d) => d !== "Super Novice")
                                    else return [...d, "Super Novice"]
                                })} />
                                <Text style={{ marginLeft: 10, fontSize: 25, fontFamily: "BebasNeue" }}>Super Novice</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                                <Checkbox style={{ width: 30, height: 30 }} value={difficulty.includes("Novice")} onValueChange={(e) => setDifficulty((d) => {
                                    if (difficulty.includes("Novice"))
                                        return d.filter((d) => d !== "Novice")
                                    else return [...d, "Novice"]
                                })} />
                                <Text style={{ marginLeft: 10, fontSize: 25, fontFamily: "BebasNeue" }}>Novice</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                                <Checkbox style={{ width: 30, height: 30 }} value={difficulty.includes("Begineer")} onValueChange={(e) => setDifficulty((d) => {
                                    if (difficulty.includes("Begineer"))
                                        return d.filter((d) => d !== "Begineer")
                                    else return [...d, "Begineer"]
                                })} />
                                <Text style={{ marginLeft: 10, fontSize: 25, fontFamily: "BebasNeue" }}>Begineer</Text>
                            </View>
                        </View>
                        <View>
                            <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                                <Checkbox style={{ width: 30, height: 30 }} value={difficulty.includes("Intermediate")} onValueChange={(e) => setDifficulty((d) => {
                                    if (difficulty.includes("Intermediate"))
                                        return d.filter((d) => d !== "Intermediate")
                                    else return [...d, "Intermediate"]
                                })} />
                                <Text style={{ marginLeft: 10, fontSize: 25, fontFamily: "BebasNeue" }}>Intermediate</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                                <Checkbox style={{ width: 30, height: 30 }} value={difficulty.includes("Advanced")} onValueChange={(e) => setDifficulty((d) => {
                                    if (difficulty.includes("Advanced"))
                                        return d.filter((d) => d !== "Advanced")
                                    else return [...d, "Advanced"]
                                })} />
                                <Text style={{ marginLeft: 10, fontSize: 25, fontFamily: "BebasNeue" }}>Advanced</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                                <Checkbox style={{ width: 30, height: 30 }} value={difficulty.includes("Expert")} onValueChange={(e) => setDifficulty((d) => {
                                    if (difficulty.includes("Expert"))
                                        return d.filter((d) => d !== "Expert")
                                    else return [...d, "Expert"]
                                })} />
                                <Text style={{ marginLeft: 10, fontSize: 25, fontFamily: "BebasNeue" }}>Expert</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'center', alignItems: 'center', }}>
                        <Pressable style={btstyles.cancel_button} onPress={() => {
                            setFilterType("")
                            setDifficulty(prevDifficulty)
                        }}>
                            <Text style={btstyles.text}>Cancel</Text>
                        </Pressable>
                        <Pressable style={btstyles.apply_button} onPress={() => {
                            setFilterType("")
                            setPrevDifficulty(difficulty)
                            // todo filters 
                        }}>
                            <Text style={btstyles.text}>Apply</Text>
                        </Pressable>
                    </View>
                </DraggablePanel>

                : (filterType === 'muscle' ?

                    <>
                        <DraggablePanel borderRadius={10} visible={filterType !== ""} onDismiss={() => setFilterType("")}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ margin: 10, fontWeight: "bold", fontSize: 40, fontFamily: "BebasNeue" }}>Muscle Group</Text>
                            </View>
                            <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'center', alignItems: 'center', }}>
                                <View style={{ margin: 10 }}>
                                    <TouchableWithoutFeedback style={{ margin: 10, padding: 10 }} onPress={() => {
                                        setMuscle((m) => {
                                            if (m.includes("Biceps"))
                                                return m.filter((mx) => mx !== "Biceps")
                                            else return [...m, "Biceps"]
                                        })
                                    }}>
                                        <View>
                                            <Image style={{ zIndex: 1, width: 90, height: 90, borderRadius: 10, borderWidth: 1, borderColor: "black" }} source={require("../assets/muscle.png")}></Image>
                                            {muscle.includes("Biceps") ? <Image style={{ position: "absolute", opacity: 0.7, zIndex: 2, width: 90, height: 90, borderRadius: 10, borderWidth: 1, borderColor: "black" }} source={require("../assets/checked.png")}></Image> : null}
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: "BebasNeue", fontSize: 24 }}>Biceps</Text>
                                    </View>
                                </View>
                                <View style={{ margin: 10 }}>
                                    <TouchableWithoutFeedback style={{ margin: 10, padding: 10 }} onPress={() => {
                                        setMuscle((m) => {
                                            if (m.includes("Quadriceps"))
                                                return m.filter((mx) => mx !== "Quadriceps")
                                            else return [...m, "Quadriceps"]
                                        })
                                    }}>
                                        <View>
                                            <Image style={{ zIndex: 1, width: 90, height: 90, borderRadius: 10, borderWidth: 1, borderColor: "black" }} source={require("../assets/quadri.png")}></Image>
                                            {muscle.includes("Quadriceps") ? <Image style={{ position: "absolute", opacity: 0.7, zIndex: 2, width: 90, height: 90, borderRadius: 10, borderWidth: 1, borderColor: "black" }} source={require("../assets/checked.png")}></Image> : null}
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: "BebasNeue", fontSize: 24 }}>Quadriceps</Text>
                                    </View>
                                </View>
                                <View style={{ margin: 10 }}>
                                    <TouchableWithoutFeedback style={{ margin: 10, padding: 10 }} onPress={() => {
                                        setMuscle((m) => {
                                            if (m.includes("Calf"))
                                                return m.filter((mx) => mx !== "Calf")
                                            else return [...m, "Calf"]
                                        })
                                    }}>
                                        <View>
                                            <Image style={{ zIndex: 1, width: 90, height: 90, borderRadius: 10, borderWidth: 1, borderColor: "black" }} source={require("../assets/calf.png")}></Image>
                                            {muscle.includes("Calf") ? <Image style={{ position: "absolute", opacity: 0.7, zIndex: 2, width: 90, height: 90, borderRadius: 10, borderWidth: 1, borderColor: "black" }} source={require("../assets/checked.png")}></Image> : null}
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: "BebasNeue", fontSize: 24 }}>Calf</Text>
                                    </View>
                                </View>
                            </View>

                            {/*<View style={{ flexDirection: 'row', margin: 3, justifyContent: 'center', alignItems: 'center', }}>
                                others muscle
                                </View>*/}
                            <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'center', alignItems: 'center', }}>
                                <Pressable style={btstyles.cancel_button} onPress={() => {
                                    setFilterType("")
                                    setMuscle(prevMuscle)
                                }}>
                                    <Text style={btstyles.text}>Cancel</Text>
                                </Pressable>
                                <Pressable style={btstyles.apply_button} onPress={() => {
                                    setFilterType("")
                                    setPrevMuscle(muscle)
                                    // todo filters 
                                }}>
                                    <Text style={btstyles.text}>Apply</Text>
                                </Pressable>
                            </View>
                        </DraggablePanel>
                    </>


                    : (
                        filterType === 'equipment' ?

                            <>
                                <DraggablePanel borderRadius={10} visible={filterType !== ""} onDismiss={() => setFilterType("")}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ margin: 10, fontWeight: "bold", fontSize: 40, fontFamily: "BebasNeue" }}>Equipment</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'center', alignItems: 'center', }}>
                                        <View style={{ margin: 10 }}>
                                            <TouchableWithoutFeedback style={{ margin: 10, padding: 10 }} onPress={() => {
                                                setEquipment((e) => {
                                                    if (e.includes("Dummbell"))
                                                        return e.filter((eq) => eq !== "Dummbell")
                                                    else return [...e, "Dummbell"]
                                                })
                                            }}>
                                                <View>
                                                    <Image style={{ zIndex: 1, width: 90, height: 90, borderRadius: 10, borderWidth: 1, borderColor: "black" }} source={require("../assets/dumbbell.png")}></Image>
                                                    {equipment.includes("Dummbell") ? <Image style={{ position: "absolute", opacity: 0.7, zIndex: 2, width: 90, height: 90, borderRadius: 10, borderWidth: 1, borderColor: "black" }} source={require("../assets/checked.png")}></Image> : null}
                                                </View>
                                            </TouchableWithoutFeedback>
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontFamily: "BebasNeue", fontSize: 24 }}>Dummbell</Text>
                                            </View>
                                        </View>
                                        <View style={{ margin: 10 }}>
                                            <TouchableWithoutFeedback style={{ margin: 10, padding: 10 }} onPress={() => {
                                                setEquipment((e) => {
                                                    if (e.includes("Kettlebell"))
                                                        return e.filter((eq) => eq !== "Kettlebell")
                                                    else return [...e, "Kettlebell"]
                                                })
                                            }}>
                                                <View>
                                                    <Image style={{ zIndex: 1, width: 90, height: 90, borderRadius: 10, borderWidth: 1, borderColor: "black" }} source={require("../assets/kettlebell.png")}></Image>
                                                    {equipment.includes("Kettlebell") ? <Image style={{ position: "absolute", opacity: 0.7, zIndex: 2, width: 90, height: 90, borderRadius: 10, borderWidth: 1, borderColor: "black" }} source={require("../assets/checked.png")}></Image> : null}
                                                </View>
                                            </TouchableWithoutFeedback>
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontFamily: "BebasNeue", fontSize: 24 }}>Kettlebell</Text>
                                            </View>
                                        </View>
                                        <View style={{ margin: 10 }}>
                                            <TouchableWithoutFeedback style={{ margin: 10, padding: 10 }} onPress={() => {
                                                setEquipment((e) => {
                                                    if (e.includes("Mat"))
                                                        return e.filter((eq) => eq !== "Mat")
                                                    else return [...e, "Mat"]
                                                })
                                            }}>
                                                <View>
                                                    <Image style={{ zIndex: 1, width: 90, height: 90, borderRadius: 10, borderWidth: 1, borderColor: "black" }} source={require("../assets/mat.png")}></Image>
                                                    {equipment.includes("Mat") ? <Image style={{ position: "absolute", opacity: 0.7, zIndex: 2, width: 90, height: 90, borderRadius: 10, borderWidth: 1, borderColor: "black" }} source={require("../assets/checked.png")}></Image> : null}
                                                </View>
                                            </TouchableWithoutFeedback>
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontFamily: "BebasNeue", fontSize: 24 }}>Mat</Text>
                                            </View>
                                        </View>
                                    </View>

                                    {/*<View style={{ flexDirection: 'row', margin: 3, justifyContent: 'center', alignItems: 'center', }}>
                                others equipment
                                </View>*/}
                                    <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'center', alignItems: 'center', }}>
                                        <Pressable style={btstyles.cancel_button} onPress={() => {
                                            setFilterType("")
                                            setEquipment(prevEquipment)
                                        }}>
                                            <Text style={btstyles.text}>Cancel</Text>
                                        </Pressable>
                                        <Pressable style={btstyles.apply_button} onPress={() => {
                                            setFilterType("")
                                            setPrevEquipment(equipment)
                                            // todo filters 
                                        }}>
                                            <Text style={btstyles.text}>Apply</Text>
                                        </Pressable>
                                    </View>
                                </DraggablePanel>
                            </>
                            : null
                    )
                )
            }
        </>
    )
}


export default Exercise;