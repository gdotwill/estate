export const  getRandomItem = <T>(arr: T[]) : T => {

    const randomIndex = Math.floor(Math.random() * arr.length);

    const item = arr[randomIndex];

    return item;
}


export const getRandomItems = <T>(arr: T[], size: number) => {

    const items: T[] = []

    for(let i=0;i<size;i++) {
        const randomItem = getRandomItem<T>(arr);
        if (!items.includes(randomItem)) {
            items.push(randomItem);
        }

    }

    return items
}