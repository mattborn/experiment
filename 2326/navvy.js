const g = document.getElementById.bind(document)

const box = options => {
  const div = document.createElement('div')
  g(options.parent).appendChild(div)
  div.className = 'swiss-army-box'

  console.log(options.icon)
  if (options.icon) {
    const icon = document.createElement('i')
    div.appendChild(icon)
    icon.className = `box-icon fa-regular fa-${options.icon}`
  }

  const stack = document.createElement('div')
  div.appendChild(stack)
  stack.className = 'box-stack'
  stack.textContent = options.label

  // child containers
  const path = options.path.split('/')
  if (path.length < 4) {
    const child = document.createElement('div')
    g('left-2').appendChild(child)
    child.id = options.path

    if (path.length < 3) {
      const h2 = document.createElement('h2')
      child.appendChild(h2)
      h2.textContent = options.label
    }
  }

  // page containers
  const page = document.createElement('div')
}

const ia = g('ia')

ia.addEventListener('input', e => {
  g('admin-nav').innerHTML = ''
  g('left-2').innerHTML = ''
  const data = Papa.parse(ia.value.trim(), { dynamicTyping: true, header: true }).data
  data.forEach(item => box(item))
})

ia.value = `parent,label,icon,path,legacy
admin-nav,Dashboards,dashboard,admin
admin,Admin Dashboard,false,admin/dashboards/1
admin-nav,Products,cube,admin/products
admin-nav,Configurations,sliders,admin/configs
admin/configs,Quick Configuration,false,admin/configs/quick
admin/configs,Product Setup,false,admin/configs/product-setup
admin/configs,Logic,false,admin/configs/logic
admin-nav,Bill of Material,file-invoice,admin/bom
admin/bom,Items,false,admin/bom/items
admin/bom/items,Item Masters,false,admin/bom/items/masters
admin/bom,Bill of Material,false,admin/bom/bom
admin-nav,Pricing,square-dollar,admin/pricing
admin-nav,Quotes & Orders,file-spreadsheet,admin/quotes
admin-nav,Cart & Checkout,shopping-cart,admin/cart
admin/cart,Cart,false,admin/cart/cart
admin/cart,Checkout,false,admin/cart/checkout
admin-nav,Integrations,plug,admin/integrations
admin-nav,Tools,tools,admin/tools
admin-nav,Users,user-friends,admin/users
admin-nav,Settings,cog,admin/settings`
ia.dispatchEvent(new Event('input', { bubbles: true }))
