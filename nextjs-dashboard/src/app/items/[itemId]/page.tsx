import { fetchItemById } from '@/app/lib/data'
import { fetchSellerById } from '@/app/lib/data'
import "../../(landingComponents)/sellers/[id]/seller-detail.css";
import ItemDetail from '@/app/(landingComponents)/items/ItemDetail'

export default async function ItemPage({ params }: { params: { itemId: string } }) {
  const { itemId } = params;
  const idNum = Number(itemId)
  if (Number.isNaN(idNum)) {
    return <div className="p-6">Invalid item id</div>
  }

  const item = await fetchItemById(idNum)
  if (!item) {
    return <div className="p-6">Item not found</div>
  }

  const seller = await fetchSellerById(String(item.sellerId))

  return (
    <main className="p-6">
  <ItemDetail item={item} seller={seller} userId={null} username={null} />

    </main>
  )
}
