import type { MetadataRoute } from 'next';
import { models } from '@/config/site';
export default function sitemap():MetadataRoute.Sitemap{
 const url=(process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000').replace(/\/$/,'');
 return ['/','/viviendas','/calculadora','/el-kit','/como-funciona','/hormigon-celular','/contacto',...models.map(m=>`/viviendas/${m.slug}`)].map(path=>({url:`${url}${path}`,lastModified:new Date(),changeFrequency:'monthly' as const,priority:path==='/'?1:.7}));
}
