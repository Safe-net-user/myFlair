import { TabsContent } from '@/components/ui/tabs';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Rate } from 'antd';

const AviData = [
    {
        id: 1,
        firstName: 'Melina',
        lastName: 'Beauty',
        rate: 4.7,
        numberOfRate: 244,
        category: 'Coiffure',
        addresse: '02 rue des Alpes, Paris, France',
        imageOfPro: 'https://media.istockphoto.com/id/1320651997/fr/photo/portrait-datelier-isolé-dune-jeune-femme-en-gros-plan.jpg?s=612x612&w=0&k=20&c=VlvYhvY75qMYbay0FI2sy4dQEbvb7w6zTlCDnEDAWbI=',
        status: 'validated',
        imageOfClient: 'https://resize.elle.fr/original/var/plain_site/storage/images/beaute/soins/tendances/dermaplaning-ce-soin-tendance-qui-consiste-a-se-raser-le-visage-4007770/96395685-1-fre-FR/Dermaplaning-ce-soin-tendance-qui-consiste-a-se-raser-le-visage.jpg',
        since: '1h',
        note: 5,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores natus quae illum labore iure odio animi pariatur unde repellendus ipsum aut harum officia magni aliquid, molestias quasi molestiae nulla vitae?',
        firstNameOfClient:'Miss',
        lastNameOfClient:'Kitty',

    }
];
import {Button} from '@/components/ui/button'
function StarRatingPro() {
    return (
        <Rate disabled defaultValue={AviData[0].rate} />
    );
}

function StarRatingOfClient() {
    return (
        <Rate disabled defaultValue={AviData[0].note} />
    );
}

function ModelSkeletonPro() {
    return (
        <div className="flex flex-col">
            <div className='flex justify-between items-center'>
                <div className='flex items-center'>
                    <img
                        style={{ height: '50px', width: '50px', border: 'solid 1px white' }}
                        className='rounded-full object-cover'
                        src={AviData[0].imageOfPro}
                        alt="Image Of The Professional"
                    />
                    <span style={{ fontSize: '130%' }} className='m-3'>{AviData[0].firstName}</span>
                    <span style={{ fontSize: '130%' }}>{AviData[0].lastName}</span>
                    <div className='pl-5'>
                        <StarRatingPro />
                        <span style={{ color: '#74788D' }} className='pl-4'>({AviData[0].numberOfRate}) avis</span>
                    </div>
                </div>
                {AviData[0].status === 'await' && (
                    <button
                        className="flex items-center text-base rounded py-1 px-3"
                        style={{ background: '#FEE9E9', color: '#FF0000', height: '30px' }}
                    >
                        <div className="rounded-full h-2 w-2 mr-2" style={{ background: '#FF0000' }}></div>
                        En attente d'aprobation
                    </button>
                )}
                {AviData[0].status === 'validated' && (
                    <button
                        className="flex items-center text-base rounded py-1 px-3"
                        style={{ background: '#EAF7EC', color: '#2DB742', height: '30px' }}
                    >
                        <div className="rounded-full h-2 w-2 mr-2" style={{ background: '#2DB742' }}></div>
                        Approuvé
                    </button>
                )}
            </div>
            <br />
            <div className="flex items-center">
                <button style={{ padding: '9px', background: '#EAEAEA',  color:'black' }} className='rounded-md'>{AviData[0].category}</button>
                <img className="ml-4" src="/iconService/map-pin-3.svg" alt="" />
                <span className="ml-2" style={{color:'#74788D'}}>{AviData[0].addresse}</span>
            </div>
            <br />
            <hr />
            <br />
        </div>
    );
}

function ModelSkeletonClient() {
    return(
        <div>
        <div className="flex justify-between items-center">
            <div className="flex">
                <img
                    style={{ height: '50px', width: '50px', border: 'solid 1px white' }}
                    className='rounded-full object-cover'
                    src={AviData[0].imageOfClient} 
                    alt="Image of Client" 
                />
                <div className="ml-4 flex flex-col">
                    <span>{AviData[0].firstNameOfClient} {AviData[0].lastNameOfClient}</span>
                    <span style={{color:'#74788D'}}>Il y a {AviData[0].since}</span>
                </div>
            </div>
            <div><StarRatingOfClient/></div>
        </div>
        <br />
        <span style={{color:'#A6A6A6'}}>{AviData[0].description}</span>
        </div>
    )
}

function ModelComment() {
    return (
        <Card className='p-5'>
            <ModelSkeletonPro />
            <ModelSkeletonClient />
            <br />
            <div className="flex justify-end">
                {AviData[0].status === 'await' ? (
                    <>
                    <Button variant="secondary">Supprimer</Button>
                    <Button className="ml-3">Approuver</Button>
                    </>
                ) : (
                    <>
                    <Button variant="secondary">Supprimer</Button>
                    <Button className="ml-3">Voir</Button>
                    </>
                )}
                
            </div>
        </Card>
    );
}

export default function Comments() {
    return (
        <TabsContent value='comment'>
            <div className="h-full flex-1 flex-col space-y-8 pl-8 pt-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">Gestion des Avis</h2>
                </div>
                <div>
                    <ModelComment />
                </div>
            </div>
        </TabsContent>
    );
}
