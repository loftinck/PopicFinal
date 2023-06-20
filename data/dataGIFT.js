import GiftDetails from '../models/giftDetails';
import Gifts from '../models/gifts';

export const GIFTS = [
    new Gifts('g1', 'Discount1', '30', '900Care', 'Obtenez -10% sur votre shampoing', 'https://image.over-blog.com/kV963okN7DDdh932HjBIFA4nA5M=/filters:no_upscale()/image%2F0991136%2F20220626%2Fob_4045db_ahr0chm6ly9jzg4uc2hvcglmes5jb20vcy9maw.jpg'),
    new Gifts('g2', 'Discount2', '100', 'The Body Shop', 'Obtenez -10% sur votre démaquillant vegan', 'https://www.madmoizelle.com/wp-content/uploads/2019/02/nouveautes-printemps-de-the-body-shop.jpg'),
    new Gifts('g3', 'Discount3', '200', 'BioCoop', "Obtenez -10% pour l'achat d'amandes bio", 'https://www.ecommercemag.fr/Assets/Img/BREVE/2021/3/358518/Belle-croissance-Biocoop-2020-F.jpg'),
    // new Gifts('g4'),
]; 

// export const GDETAILS = [
//     new GiftDetails('d1', ['g1'],'900Care', 'Get 10% discount on a shampoo'),
//     new GiftDetails('d2', ['g2'], 'The Body Shop', 'Get 10% discount on a vegan make up remover'),
//     new GiftDetails('d3', ['g3'], 'BioCoop', 'Get 10% discount on almonds'),
// ]   
