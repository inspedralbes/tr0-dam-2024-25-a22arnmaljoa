export async function aconseguirPreg(){
    const response = await fetch("http://localhost:3000/quests");
    const preguntes = await response.json();
    return preguntes;
}

export async function python2Vue() {
    const response = await fetch("http://localhost:5173");
    const preg = await response.json();
    return preg;
}