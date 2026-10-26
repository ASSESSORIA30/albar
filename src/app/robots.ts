import type { MetadataRoute } from 'next';
export default function robots():MetadataRoute.Robots{
 const url=(process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000').replace(/\/$/,'');
 return {rules:{userAgent:'*',allow:'/',disallow:['/api/','/editor','/aviso-legal','/privacidad','/cookies']},sitemap:`${url}/sitemap.xml`};
}
