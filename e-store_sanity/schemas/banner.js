export default {
	name: 'banner',
	title: 'Banner',
	type: 'document',
	fields: [
		{
			name: 'image',
			title: 'Image',
			type: 'image',
			options: {
				hotspot: true,
			},
		},
		{
			name: 'buttonText',
			title: 'ButtonText',
			type: 'string',
		},
		{
			name: 'product',
			title: 'Product',
			type: 'string',
		},
		{
			name: 'desc',
			title: 'Desc',
			type: 'string',
		},
		{
			name: 'smallText',
			title: 'SmallText',
			type: 'string',
		},
		{
			name: 'centerText',
			title: 'centerText',
			type: 'string',
		},
		{
			name: 'subText',
			title: 'subText',
			type: 'string',
		},
		{
			name: 'largeText2',
			title: 'LargeText2',
			type: 'string',
		},
		{
			name: 'discount',
			title: 'Discount',
			type: 'string',
		},
		{
			name: 'saleTime',
			title: 'SaleTime',
			type: 'string',
		},
	],
};
