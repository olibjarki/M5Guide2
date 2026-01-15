import { getGreetings } from '../lib/serverfunctions';

export default async function Database() {
    const greetings =  await getGreetings();
    return (
        <>
            {greetings.map(greetingObj=> <h1 key={greetingObj._id.toString()}>{greetingObj.greeting}</h1>)}
        </>
    )
  }