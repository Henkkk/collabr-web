export const licenseTemplates = [
    {
        id: '1',
        name: 'Non-Commercial Social Remixing',
        description: 'Allows non-commercial use with required attribution and derivatives allowed',
        details: [
            'Remix this work',
            'Distribute the remix anywhere',
            'Credit IP owner appropriately',
        ],
        parameters: [
            'transferable',
            'royaltyPolicy',
            'commercializerChecker',
            'commercializerCheckerData',
            'commercialRevShare',
            'commercialRevCeiling',
            'uri',
            'expiration'
        ]
    },
    {
        id: '2',
        name: 'Commercial License with Minting Fee',
        description: 'Commercial license with upfront minting fee and royalty policy',
        details: [
            'Purchase the right to use your creation',
            'Commercialize the original and derivative works',
            'Distribute their remix anywhere',
        ],
        parameters: [
            'transferable',
            'royaltyPolicy',
            'defaultMintingFee',
            'commercialAttribution',
            'commercializerChecker',
            'commercializerCheckerData',
            'commercialRevShare',
            'commercialRevCeiling',
            'derivativesAllowed',
            'derivativesAttribution',
            'derivativesApproval',
            'derivativesReciprocal',
            'derivativeRevCeiling',
            'currency',
            'uri',
            'expiration',
        ]
    },
    {
        id: '3',
        name: 'Open Commercial Remixing',
        description: 'Allows both commercial use and derivatives with required attribution',
        details: [
            'Remix this work',
            'Distribute their remix anywhere',
            'Credit the IP owner appropriately',
            'Commercialize the original and derivative'
        ],
        parameters: [
            'transferable',
            'royaltyPolicy',
            'defaultMintingFee',
            'commercialRevShare',
            'derivativesReciprocal',
            'currency',
            'uri',
            'expiration',
        ]
    }
]; 