import { connect, ConnectOptions } from 'mongoose';

export const dbConnect = () => {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        console.error('MONGO_URI environment variable is not defined.');
        return;
    }

    connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions).then(
        () => console.log('Connected successfully'),
        (error) => console.error('Error connecting to the database:', error)
    );
};
