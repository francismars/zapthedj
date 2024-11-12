console.log("isto entra")

const kind1ID = "416cb6413b8635edbaa11660e7bc032af7d08e3c94ec1d87afa2926d26621865"

const pool = new NostrTools.SimplePool()
const relays = ['wss://relay.damus.io', 'wss://relay.primal.net', 'wss://relay.nostr.band/', 'wss://relay.nostr.nu/']

subscribeKind1() 

async function subscribeKind1() {
    let filter = { kinds: [1], ids: [kind1ID]}
    pool.subscribeMany(
        [...relays],
        [filter],
        {
        async onevent(kind1) {
            console.log(kind1)
            await subscribeKind0fromKind1(kind1)
            await subscribeKind9735fromKind1(kind1)
        },
        async oneose() {
            console.log("subscribeKind1() EOS")
        },
        onclosed() {
            console.log("subscribeKind1() Closed")
        }
    })
  }

  async function subscribeKind0fromKind1(kind1) {
    let kind0key = kind1.pubkey
    const sub = pool.subscribeMany(
        [...relays],
        [{
            kinds: [0],
            authors: [kind0key]
        }]
    ,{
        onevent(kind0) {
            console.log(kind0)
        },
        async oneose() {
            console.log("subscribeKind0sfromKind1s() EOS")
        },
        onclosed() {
            console.log("subscribeKind0sfromKind1s() Closed")
        }
    })
  }

  async function subscribeKind9735fromKind1(kind1) {
    let kind0id = kind1.id
    const sub = pool.subscribeMany(
        [...relays],
        [{
            kinds: [9735],
            authors: [kind0id]
        }]
    ,{
        onevent(kind9735) {
            console.log(kind9735)
        },
        async oneose() {
            console.log("subscribeKind9735fromKind1() EOS")
        },
        onclosed() {
            console.log("subscribeKind9735fromKind1() Closed")
        }
    })
  }