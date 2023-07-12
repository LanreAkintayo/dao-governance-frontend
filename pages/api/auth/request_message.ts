import Moralis from 'moralis';
import { Response } from '../../../types';
const config = {
    domain: process.env.NEXT_APP_DOMAIN,
    statement: 'Please sign this message to confirm your identity.',
    uri: process.env.NEXT_AUTH_URL,
    timeout: 60,
};


export default async function handler(req: Request, res: Response) {
    const { address, chain, network } = req.body;
    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
    try {
        const message = await Moralis.Auth.requestMessage({
            address,
            chain,
            network,
            ...config,
        });
        res.status(200).json(message);
    } catch (error) {
        res.status(400).json({ error });
        console.error(error);
    }
}