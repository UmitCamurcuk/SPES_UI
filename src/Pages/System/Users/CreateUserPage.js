import React, { useEffect, useRef, useState } from 'react'
import InternalLayout from '../../Layouts/InternalLayout'
import { Autocomplete, Grid, IconButton, Paper, TextField, Typography } from '@mui/material'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { StyledSpesEngineInput } from '../../../Components/Inputs/StyledInputs';
import { StyledNextStepButton, StyledPreviousStepButton, StyledSaveButton } from '../../../Components/Buttons/StyledButtons';
import { postDataRequest } from '../../../Axios/dataRequests';
import ShowMessage from '../../../Components/Notifications/Toastify';
import SpesEngineDynamicTable from '../../../Components/Tables/SpesEngineDynamicTable';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import Tooltip from '@mui/material/Tooltip';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import CakeRoundedIcon from '@mui/icons-material/CakeRounded';
import ProfileBannerPlaceholder from '../../../Assets/Images/Icons/ProfileBannerPlaceholder.jpg'
import ProfilePhotoPlaceholderMale from '../../../Assets/Images/Icons/ProfilePhotoPlaceholderMale.jpeg'
import ProfilePhotoPlaceholderFemale from '../../../Assets/Images/Icons/ProfilePhotoPlaceholderFemale.jpeg'
import { StyledSelectDropdown } from '../../../Components/DropdownSelects/StyledAutoComplates';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function CreateUserPage() {
    // STATES AND VARIABLES _________________________________________________________________
    const [activeStep, SetActiveStep] = useState(0);
    const [saveButtonDisabled, SetSaveButtonDisabled] = useState(false);
    const [selectedRoles, SetSelectedRoles] = useState([]);
    const profilePhotoRef = useRef();
    const profileBannerRef = useRef();
    const [userData, SetUserData] = useState({
        Name: '',
        LastName: '',
        UserName: '',
        Password: '',
        Email: '',
        BirthDate: '',
        Phone: '',
        isActive: false,
        Location: {
            Country: '',
            City: '1',
            Neighborhood: '2',
            AdressString: '',
        },
        Gender: '',
        Roles: [],
        RoleNames: [],
        ProfilePhotos: '',
        ProfileBanners: '',
    })
    const steps = [
        'User Information',
        'Permissions And Roles',
    ];
    const countries = [
        { code: 'AD', label: 'Andorra', phone: '376' },
        {
            code: 'AE',
            label: 'United Arab Emirates',
            phone: '971',
        },
        { code: 'AF', label: 'Afghanistan', phone: '93' },
        {
            code: 'AG',
            label: 'Antigua and Barbuda',
            phone: '1-268',
        },
        { code: 'AI', label: 'Anguilla', phone: '1-264' },
        { code: 'AL', label: 'Albania', phone: '355' },
        { code: 'AM', label: 'Armenia', phone: '374' },
        { code: 'AO', label: 'Angola', phone: '244' },
        { code: 'AQ', label: 'Antarctica', phone: '672' },
        { code: 'AR', label: 'Argentina', phone: '54' },
        { code: 'AS', label: 'American Samoa', phone: '1-684' },
        { code: 'AT', label: 'Austria', phone: '43' },
        {
            code: 'AU',
            label: 'Australia',
            phone: '61',
            suggested: true,
        },
        { code: 'AW', label: 'Aruba', phone: '297' },
        { code: 'AX', label: 'Alland Islands', phone: '358' },
        { code: 'AZ', label: 'Azerbaijan', phone: '994' },
        {
            code: 'BA',
            label: 'Bosnia and Herzegovina',
            phone: '387',
        },
        { code: 'BB', label: 'Barbados', phone: '1-246' },
        { code: 'BD', label: 'Bangladesh', phone: '880' },
        { code: 'BE', label: 'Belgium', phone: '32' },
        { code: 'BF', label: 'Burkina Faso', phone: '226' },
        { code: 'BG', label: 'Bulgaria', phone: '359' },
        { code: 'BH', label: 'Bahrain', phone: '973' },
        { code: 'BI', label: 'Burundi', phone: '257' },
        { code: 'BJ', label: 'Benin', phone: '229' },
        { code: 'BL', label: 'Saint Barthelemy', phone: '590' },
        { code: 'BM', label: 'Bermuda', phone: '1-441' },
        { code: 'BN', label: 'Brunei Darussalam', phone: '673' },
        { code: 'BO', label: 'Bolivia', phone: '591' },
        { code: 'BR', label: 'Brazil', phone: '55' },
        { code: 'BS', label: 'Bahamas', phone: '1-242' },
        { code: 'BT', label: 'Bhutan', phone: '975' },
        { code: 'BV', label: 'Bouvet Island', phone: '47' },
        { code: 'BW', label: 'Botswana', phone: '267' },
        { code: 'BY', label: 'Belarus', phone: '375' },
        { code: 'BZ', label: 'Belize', phone: '501' },
        {
            code: 'CA',
            label: 'Canada',
            phone: '1',
            suggested: true,
        },
        {
            code: 'CC',
            label: 'Cocos (Keeling) Islands',
            phone: '61',
        },
        {
            code: 'CD',
            label: 'Congo, Democratic Republic of the',
            phone: '243',
        },
        {
            code: 'CF',
            label: 'Central African Republic',
            phone: '236',
        },
        {
            code: 'CG',
            label: 'Congo, Republic of the',
            phone: '242',
        },
        { code: 'CH', label: 'Switzerland', phone: '41' },
        { code: 'CI', label: "Cote d'Ivoire", phone: '225' },
        { code: 'CK', label: 'Cook Islands', phone: '682' },
        { code: 'CL', label: 'Chile', phone: '56' },
        { code: 'CM', label: 'Cameroon', phone: '237' },
        { code: 'CN', label: 'China', phone: '86' },
        { code: 'CO', label: 'Colombia', phone: '57' },
        { code: 'CR', label: 'Costa Rica', phone: '506' },
        { code: 'CU', label: 'Cuba', phone: '53' },
        { code: 'CV', label: 'Cape Verde', phone: '238' },
        { code: 'CW', label: 'Curacao', phone: '599' },
        { code: 'CX', label: 'Christmas Island', phone: '61' },
        { code: 'CY', label: 'Cyprus', phone: '357' },
        { code: 'CZ', label: 'Czech Republic', phone: '420' },
        {
            code: 'DE',
            label: 'Germany',
            phone: '49',
            suggested: true,
        },
        { code: 'DJ', label: 'Djibouti', phone: '253' },
        { code: 'DK', label: 'Denmark', phone: '45' },
        { code: 'DM', label: 'Dominica', phone: '1-767' },
        {
            code: 'DO',
            label: 'Dominican Republic',
            phone: '1-809',
        },
        { code: 'DZ', label: 'Algeria', phone: '213' },
        { code: 'EC', label: 'Ecuador', phone: '593' },
        { code: 'EE', label: 'Estonia', phone: '372' },
        { code: 'EG', label: 'Egypt', phone: '20' },
        { code: 'EH', label: 'Western Sahara', phone: '212' },
        { code: 'ER', label: 'Eritrea', phone: '291' },
        { code: 'ES', label: 'Spain', phone: '34' },
        { code: 'ET', label: 'Ethiopia', phone: '251' },
        { code: 'FI', label: 'Finland', phone: '358' },
        { code: 'FJ', label: 'Fiji', phone: '679' },
        {
            code: 'FK',
            label: 'Falkland Islands (Malvinas)',
            phone: '500',
        },
        {
            code: 'FM',
            label: 'Micronesia, Federated States of',
            phone: '691',
        },
        { code: 'FO', label: 'Faroe Islands', phone: '298' },
        {
            code: 'FR',
            label: 'France',
            phone: '33',
            suggested: true,
        },
        { code: 'GA', label: 'Gabon', phone: '241' },
        { code: 'GB', label: 'United Kingdom', phone: '44' },
        { code: 'GD', label: 'Grenada', phone: '1-473' },
        { code: 'GE', label: 'Georgia', phone: '995' },
        { code: 'GF', label: 'French Guiana', phone: '594' },
        { code: 'GG', label: 'Guernsey', phone: '44' },
        { code: 'GH', label: 'Ghana', phone: '233' },
        { code: 'GI', label: 'Gibraltar', phone: '350' },
        { code: 'GL', label: 'Greenland', phone: '299' },
        { code: 'GM', label: 'Gambia', phone: '220' },
        { code: 'GN', label: 'Guinea', phone: '224' },
        { code: 'GP', label: 'Guadeloupe', phone: '590' },
        { code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
        { code: 'GR', label: 'Greece', phone: '30' },
        {
            code: 'GS',
            label: 'South Georgia and the South Sandwich Islands',
            phone: '500',
        },
        { code: 'GT', label: 'Guatemala', phone: '502' },
        { code: 'GU', label: 'Guam', phone: '1-671' },
        { code: 'GW', label: 'Guinea-Bissau', phone: '245' },
        { code: 'GY', label: 'Guyana', phone: '592' },
        { code: 'HK', label: 'Hong Kong', phone: '852' },
        {
            code: 'HM',
            label: 'Heard Island and McDonald Islands',
            phone: '672',
        },
        { code: 'HN', label: 'Honduras', phone: '504' },
        { code: 'HR', label: 'Croatia', phone: '385' },
        { code: 'HT', label: 'Haiti', phone: '509' },
        { code: 'HU', label: 'Hungary', phone: '36' },
        { code: 'ID', label: 'Indonesia', phone: '62' },
        { code: 'IE', label: 'Ireland', phone: '353' },
        { code: 'IL', label: 'Israel', phone: '972' },
        { code: 'IM', label: 'Isle of Man', phone: '44' },
        { code: 'IN', label: 'India', phone: '91' },
        {
            code: 'IO',
            label: 'British Indian Ocean Territory',
            phone: '246',
        },
        { code: 'IQ', label: 'Iraq', phone: '964' },
        {
            code: 'IR',
            label: 'Iran, Islamic Republic of',
            phone: '98',
        },
        { code: 'IS', label: 'Iceland', phone: '354' },
        { code: 'IT', label: 'Italy', phone: '39' },
        { code: 'JE', label: 'Jersey', phone: '44' },
        { code: 'JM', label: 'Jamaica', phone: '1-876' },
        { code: 'JO', label: 'Jordan', phone: '962' },
        {
            code: 'JP',
            label: 'Japan',
            phone: '81',
            suggested: true,
        },
        { code: 'KE', label: 'Kenya', phone: '254' },
        { code: 'KG', label: 'Kyrgyzstan', phone: '996' },
        { code: 'KH', label: 'Cambodia', phone: '855' },
        { code: 'KI', label: 'Kiribati', phone: '686' },
        { code: 'KM', label: 'Comoros', phone: '269' },
        {
            code: 'KN',
            label: 'Saint Kitts and Nevis',
            phone: '1-869',
        },
        {
            code: 'KP',
            label: "Korea, Democratic People's Republic of",
            phone: '850',
        },
        { code: 'KR', label: 'Korea, Republic of', phone: '82' },
        { code: 'KW', label: 'Kuwait', phone: '965' },
        { code: 'KY', label: 'Cayman Islands', phone: '1-345' },
        { code: 'KZ', label: 'Kazakhstan', phone: '7' },
        {
            code: 'LA',
            label: "Lao People's Democratic Republic",
            phone: '856',
        },
        { code: 'LB', label: 'Lebanon', phone: '961' },
        { code: 'LC', label: 'Saint Lucia', phone: '1-758' },
        { code: 'LI', label: 'Liechtenstein', phone: '423' },
        { code: 'LK', label: 'Sri Lanka', phone: '94' },
        { code: 'LR', label: 'Liberia', phone: '231' },
        { code: 'LS', label: 'Lesotho', phone: '266' },
        { code: 'LT', label: 'Lithuania', phone: '370' },
        { code: 'LU', label: 'Luxembourg', phone: '352' },
        { code: 'LV', label: 'Latvia', phone: '371' },
        { code: 'LY', label: 'Libya', phone: '218' },
        { code: 'MA', label: 'Morocco', phone: '212' },
        { code: 'MC', label: 'Monaco', phone: '377' },
        {
            code: 'MD',
            label: 'Moldova, Republic of',
            phone: '373',
        },
        { code: 'ME', label: 'Montenegro', phone: '382' },
        {
            code: 'MF',
            label: 'Saint Martin (French part)',
            phone: '590',
        },
        { code: 'MG', label: 'Madagascar', phone: '261' },
        { code: 'MH', label: 'Marshall Islands', phone: '692' },
        {
            code: 'MK',
            label: 'Macedonia, the Former Yugoslav Republic of',
            phone: '389',
        },
        { code: 'ML', label: 'Mali', phone: '223' },
        { code: 'MM', label: 'Myanmar', phone: '95' },
        { code: 'MN', label: 'Mongolia', phone: '976' },
        { code: 'MO', label: 'Macao', phone: '853' },
        {
            code: 'MP',
            label: 'Northern Mariana Islands',
            phone: '1-670',
        },
        { code: 'MQ', label: 'Martinique', phone: '596' },
        { code: 'MR', label: 'Mauritania', phone: '222' },
        { code: 'MS', label: 'Montserrat', phone: '1-664' },
        { code: 'MT', label: 'Malta', phone: '356' },
        { code: 'MU', label: 'Mauritius', phone: '230' },
        { code: 'MV', label: 'Maldives', phone: '960' },
        { code: 'MW', label: 'Malawi', phone: '265' },
        { code: 'MX', label: 'Mexico', phone: '52' },
        { code: 'MY', label: 'Malaysia', phone: '60' },
        { code: 'MZ', label: 'Mozambique', phone: '258' },
        { code: 'NA', label: 'Namibia', phone: '264' },
        { code: 'NC', label: 'New Caledonia', phone: '687' },
        { code: 'NE', label: 'Niger', phone: '227' },
        { code: 'NF', label: 'Norfolk Island', phone: '672' },
        { code: 'NG', label: 'Nigeria', phone: '234' },
        { code: 'NI', label: 'Nicaragua', phone: '505' },
        { code: 'NL', label: 'Netherlands', phone: '31' },
        { code: 'NO', label: 'Norway', phone: '47' },
        { code: 'NP', label: 'Nepal', phone: '977' },
        { code: 'NR', label: 'Nauru', phone: '674' },
        { code: 'NU', label: 'Niue', phone: '683' },
        { code: 'NZ', label: 'New Zealand', phone: '64' },
        { code: 'OM', label: 'Oman', phone: '968' },
        { code: 'PA', label: 'Panama', phone: '507' },
        { code: 'PE', label: 'Peru', phone: '51' },
        { code: 'PF', label: 'French Polynesia', phone: '689' },
        { code: 'PG', label: 'Papua New Guinea', phone: '675' },
        { code: 'PH', label: 'Philippines', phone: '63' },
        { code: 'PK', label: 'Pakistan', phone: '92' },
        { code: 'PL', label: 'Poland', phone: '48' },
        {
            code: 'PM',
            label: 'Saint Pierre and Miquelon',
            phone: '508',
        },
        { code: 'PN', label: 'Pitcairn', phone: '870' },
        { code: 'PR', label: 'Puerto Rico', phone: '1' },
        {
            code: 'PS',
            label: 'Palestine, State of',
            phone: '970',
        },
        { code: 'PT', label: 'Portugal', phone: '351' },
        { code: 'PW', label: 'Palau', phone: '680' },
        { code: 'PY', label: 'Paraguay', phone: '595' },
        { code: 'QA', label: 'Qatar', phone: '974' },
        { code: 'RE', label: 'Reunion', phone: '262' },
        { code: 'RO', label: 'Romania', phone: '40' },
        { code: 'RS', label: 'Serbia', phone: '381' },
        { code: 'RU', label: 'Russian Federation', phone: '7' },
        { code: 'RW', label: 'Rwanda', phone: '250' },
        { code: 'SA', label: 'Saudi Arabia', phone: '966' },
        { code: 'SB', label: 'Solomon Islands', phone: '677' },
        { code: 'SC', label: 'Seychelles', phone: '248' },
        { code: 'SD', label: 'Sudan', phone: '249' },
        { code: 'SE', label: 'Sweden', phone: '46' },
        { code: 'SG', label: 'Singapore', phone: '65' },
        { code: 'SH', label: 'Saint Helena', phone: '290' },
        { code: 'SI', label: 'Slovenia', phone: '386' },
        {
            code: 'SJ',
            label: 'Svalbard and Jan Mayen',
            phone: '47',
        },
        { code: 'SK', label: 'Slovakia', phone: '421' },
        { code: 'SL', label: 'Sierra Leone', phone: '232' },
        { code: 'SM', label: 'San Marino', phone: '378' },
        { code: 'SN', label: 'Senegal', phone: '221' },
        { code: 'SO', label: 'Somalia', phone: '252' },
        { code: 'SR', label: 'Suriname', phone: '597' },
        { code: 'SS', label: 'South Sudan', phone: '211' },
        {
            code: 'ST',
            label: 'Sao Tome and Principe',
            phone: '239',
        },
        { code: 'SV', label: 'El Salvador', phone: '503' },
        {
            code: 'SX',
            label: 'Sint Maarten (Dutch part)',
            phone: '1-721',
        },
        {
            code: 'SY',
            label: 'Syrian Arab Republic',
            phone: '963',
        },
        { code: 'SZ', label: 'Swaziland', phone: '268' },
        {
            code: 'TC',
            label: 'Turks and Caicos Islands',
            phone: '1-649',
        },
        { code: 'TD', label: 'Chad', phone: '235' },
        {
            code: 'TF',
            label: 'French Southern Territories',
            phone: '262',
        },
        { code: 'TG', label: 'Togo', phone: '228' },
        { code: 'TH', label: 'Thailand', phone: '66' },
        { code: 'TJ', label: 'Tajikistan', phone: '992' },
        { code: 'TK', label: 'Tokelau', phone: '690' },
        { code: 'TL', label: 'Timor-Leste', phone: '670' },
        { code: 'TM', label: 'Turkmenistan', phone: '993' },
        { code: 'TN', label: 'Tunisia', phone: '216' },
        { code: 'TO', label: 'Tonga', phone: '676' },
        { code: 'TR', label: 'Turkey', phone: '90' },
        {
            code: 'TT',
            label: 'Trinidad and Tobago',
            phone: '1-868',
        },
        { code: 'TV', label: 'Tuvalu', phone: '688' },
        {
            code: 'TW',
            label: 'Taiwan',
            phone: '886',
        },
        {
            code: 'TZ',
            label: 'United Republic of Tanzania',
            phone: '255',
        },
        { code: 'UA', label: 'Ukraine', phone: '380' },
        { code: 'UG', label: 'Uganda', phone: '256' },
        {
            code: 'US',
            label: 'United States',
            phone: '1',
            suggested: true,
        },
        { code: 'UY', label: 'Uruguay', phone: '598' },
        { code: 'UZ', label: 'Uzbekistan', phone: '998' },
        {
            code: 'VA',
            label: 'Holy See (Vatican City State)',
            phone: '379',
        },
        {
            code: 'VC',
            label: 'Saint Vincent and the Grenadines',
            phone: '1-784',
        },
        { code: 'VE', label: 'Venezuela', phone: '58' },
        {
            code: 'VG',
            label: 'British Virgin Islands',
            phone: '1-284',
        },
        {
            code: 'VI',
            label: 'US Virgin Islands',
            phone: '1-340',
        },
        { code: 'VN', label: 'Vietnam', phone: '84' },
        { code: 'VU', label: 'Vanuatu', phone: '678' },
        { code: 'WF', label: 'Wallis and Futuna', phone: '681' },
        { code: 'WS', label: 'Samoa', phone: '685' },
        { code: 'XK', label: 'Kosovo', phone: '383' },
        { code: 'YE', label: 'Yemen', phone: '967' },
        { code: 'YT', label: 'Mayotte', phone: '262' },
        { code: 'ZA', label: 'South Africa', phone: '27' },
        { code: 'ZM', label: 'Zambia', phone: '260' },
        { code: 'ZW', label: 'Zimbabwe', phone: '263' },
    ];

    // HOOKS ________________________________________________________________________________
    useEffect(() => {
        SetUserData(prevState => ({
            ...prevState,
            RoleNames: selectedRoles.map(item => item.Name)
        }))

        SetUserData(prevState => ({
            ...prevState,
            Roles: selectedRoles.map(item => item._id)
        }))
    }, [selectedRoles])

    // FUNCTIONS AND METHODS ________________________________________________________________
    const handleInputChange = (e) => {
        const tempUserData = { ...userData };
        tempUserData[e.target.name] = e.target.value;
        SetUserData(tempUserData);
    };

    const handleProfilePhotoUpload = async () => {
        try {
            const file = profilePhotoRef.current.files?.[0];

            if (file) {
                // Dosyayı base64 verisine dönüştür
                const base64 = await convertFileToBase64(file);

                // Base64 verisini userData içindeki ProfilePhotos alanına set et
                SetUserData((prevState) => ({
                    ...prevState,
                    ProfilePhotos: `data:image/png;base64,${base64}`,
                }));
            }
        } catch (error) {
            console.error('Profil fotoğrafı yükleme hatası:', error);
        }
    };
    const handleBannerPhotoUpload = async () => {
        try {
            const file = profileBannerRef.current.files?.[0];

            if (file) {
                // Dosyayı base64 verisine dönüştür
                const base64 = await convertFileToBase64(file);

                // Base64 verisini userData içindeki ProfilePhotos alanına set et
                console.log(base64);
                SetUserData((prevState) => ({
                    ...prevState,
                    ProfileBanners: `data:image/png;base64,${base64}`,
                }));
            }
        } catch (error) {
            console.error('Profil fotoğrafı yükleme hatası:', error);
        }
    };
    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            try {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result.split(',')[1]);
                reader.onerror = (error) => reject(error);
                reader.readAsDataURL(file);
            } catch (error) {
                reject(error);
            }
        });
    };
    const handleClickNext = () => {
        activeStep === 0 && SetActiveStep(1);
        activeStep === 1 && SetActiveStep(2);
        activeStep === 2 && SetActiveStep(3);
    }
    const handleClickPrevious = () => {
        activeStep === 3 && SetActiveStep(2);
        activeStep === 2 && SetActiveStep(1);
        activeStep === 1 && SetActiveStep(0);
    }
    const handleCountrySelect = (e) => {
        if (e) {
            const tempUserData = { ...userData };
            tempUserData.Location.Country = e.label;
            SetUserData(tempUserData);
        } else {
            const tempUserData = { ...userData };
            tempUserData.Location.Country = '';
            SetUserData(tempUserData);
        }
    }
    const handleCitySelect = (e) => {
        if (e) {
            const tempUserData = { ...userData };
            tempUserData.Location.City = e.label;
            SetUserData(tempUserData);
        } else {
            const tempUserData = { ...userData };
            tempUserData.Location.City = '';
            SetUserData(tempUserData);
        }
    }
    const handleNeighborhoodSelect = (e) => {
        if (e) {
            const tempUserData = { ...userData };
            tempUserData.Location.Neighborhood = e.label;
            SetUserData(tempUserData);
        } else {
            const tempUserData = { ...userData };
            tempUserData.Location.Neighborhood = '';
            SetUserData(tempUserData);
        }
    }
    const handleBirthdateChange = (e) => {
        SetUserData(prevState => ({
            ...prevState,
            BirthDate: `${e.$d}`
        }))
    }
    const handleAdresStringChange = (e) => {
        const tempUserData = { ...userData };
        tempUserData.Location.AdressString = e.target.value;
        SetUserData(tempUserData);
    }
    const handleGenderChange = (e) => {
        if (e) {
            const tempUserData = { ...userData };
            tempUserData['Gender'] = e.Code;
            SetUserData(tempUserData);
        } else {
            const tempUserData = { ...userData };
            tempUserData['Gender'] = '';
            SetUserData(tempUserData);
        }
    }
    const handlePhonePrefixChange = (e) => {
        if (e) {
            SetUserData(prevState => ({
                ...prevState,
                Phone: `+(${e.phone})`
            }))
        } else {
            SetUserData(prevState => ({
                ...prevState,
                Phone: ''
            }))
        }
    }

    const handleClickSave = async () => {
        console.log(userData);
        SetSaveButtonDisabled(true);
        try {
            console.log(selectedRoles);
            const response = await postDataRequest(`/User/CreateUser`, userData);
            if (response.Code === 200) {
                ShowMessage('Success', 'User Saved Succesfully. Returning to User List page');
            } else {
                ShowMessage('Error', response.Message);
            }
            SetSaveButtonDisabled(false);
        } catch (error) {
            ShowMessage('Error', error);
            SetSaveButtonDisabled(false);
        }
    }

    return (
        <InternalLayout>
            <Grid container spacing={2}>
                <Grid item xl={12} md={12} xs={12}>
                    <Paper elevation={0}>
                        <Box sx={{ width: '100%' }}>
                            <Stepper activeStep={activeStep} alternativeLabel>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                    </Paper>
                </Grid>

                <Grid sx={{ display: activeStep === 0 ? 'block' : 'none' }} item xl={12} md={12} xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xl={8} md={8} xs={12}>
                            <Paper elevation={0} sx={{ pr: 3, pl: 3, pt: 2, pb: 5, minHeight: '60vh' }}>
                                <Grid container spacing={2}>
                                    <Grid item xl={12} md={12} xs={12}>
                                        <Typography fontSize='18px' fontWeight={500}>
                                            Personal Informations
                                        </Typography>
                                        <Grid mt={2} container spacing={1}>
                                            <Grid item xl={3} md={4} xs={12}>
                                                <Typography mb={1}>
                                                    Name
                                                </Typography>
                                                <StyledSpesEngineInput
                                                    name='Name'
                                                    value={userData.Name}
                                                    onChange={handleInputChange}
                                                />
                                            </Grid>

                                            <Grid item xl={3} md={4} xs={12}>
                                                <Typography mb={1}>
                                                    Lastname
                                                </Typography>
                                                <StyledSpesEngineInput
                                                    name='LastName'
                                                    value={userData.LastName}
                                                    onChange={handleInputChange}
                                                />
                                            </Grid>
                                            <Grid item xl={3} md={4} xs={12}>
                                                <Typography mb={1}>
                                                    Gender
                                                </Typography>
                                                <Box sx={{ maxWidth: '200px' }}>
                                                    <StyledSelectDropdown
                                                        options={[
                                                            { label: 'Male', Code: 'MALE' },
                                                            { label: 'Female', Code: 'FEMALE' },
                                                        ]}
                                                        filterSelectedOptions
                                                        id="attributeTypeSelect"
                                                        getOptionLabel={(option) => option.label}
                                                        isOptionEqualToValue={(option, value) => option.label === value.label && option.code === value.code}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                            />
                                                        )}
                                                        onChange={(event, newValue) => {
                                                            handleGenderChange(newValue)
                                                        }}
                                                    />
                                                </Box>
                                            </Grid>
                                            <Grid item xl={3} md={4} xs={12}>
                                                <Typography mb={1}>
                                                    Birthdate
                                                </Typography>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DemoContainer
                                                        components={['DatePicker']}>
                                                        <DatePicker
                                                            sx={{
                                                                borderRadius: '20px',
                                                                color: 'red', // İstediğiniz border radius'u burada belirtin
                                                                '& .MuiPickersDay-daySelected': {
                                                                    backgroundColor: 'rgba(33, 150, 243, 0.5)', // Örnek bir seçili gün rengi
                                                                },
                                                                // Diğer özelleştirmeleri buraya ekleyebilirsiniz
                                                            }}
                                                            onChange={(e) => handleBirthdateChange(e)}
                                                            label="DD.MM.YYY" />
                                                    </DemoContainer>
                                                </LocalizationProvider>
                                            </Grid>

                                            <Grid item xl={3} md={4} xs={12}>
                                                <Typography mb={1}>
                                                    Phone
                                                </Typography>
                                                <Box sx={{ display: 'inline-flex' }}>
                                                    <Autocomplete
                                                        id="country-select-demo"
                                                        sx={{
                                                            width: '120px',
                                                            marginLeft: 'auto',
                                                            marginRight: 'auto',
                                                            paddingBottom: 0,
                                                            height: '43.59px',
                                                            borderRadius: '20px',
                                                            fontSize: '16px',
                                                            '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
                                                                borderRadius: '20px',
                                                                height: '43.59px',
                                                                display: 'inline-flex',
                                                                alignContent: 'center'
                                                            },
                                                            '& .MuiChip-root': {
                                                                backgroundColor: '#64b5f6', // Seçilen öğelerin chip rengi
                                                                color: '#ffffff', // Chip metni rengi
                                                                '&:focus': {
                                                                    backgroundColor: '#1565c0', // Odaklandığında chip rengi
                                                                },
                                                            },
                                                        }}
                                                        options={countries}
                                                        autoHighlight
                                                        onChange={(event, newValue) => {
                                                            handlePhonePrefixChange(newValue)
                                                        }}
                                                        getOptionLabel={(option) => option.label}
                                                        renderOption={(props, option) => (
                                                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                                <img
                                                                    loading="lazy"
                                                                    width="20"
                                                                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                                    alt=""
                                                                />
                                                                <Typography fontSize='11px'>
                                                                    + {option.phone}
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Phone Code"
                                                                inputProps={{
                                                                    ...params.inputProps,
                                                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                    <StyledSpesEngineInput
                                                        prefix='asfd'
                                                        name='Phone'
                                                        value={userData.Phone}
                                                        onChange={handleInputChange}
                                                    />
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid mt={3} item xl={12} md={12} xs={12}>
                                        <Typography fontSize='18px' fontWeight={500}>
                                            Account Informations
                                        </Typography>
                                        <Grid mt={2} container spacing={1}>
                                            <Grid item xl={3} md={4} xs={12}>
                                                <Typography>
                                                    Email
                                                </Typography>
                                                <StyledSpesEngineInput
                                                    name='Email'
                                                    value={userData.Email}
                                                    onChange={handleInputChange}
                                                />
                                            </Grid>
                                            <Grid item xl={3} md={4} xs={12}>
                                                <Typography>
                                                    Username
                                                </Typography>
                                                <StyledSpesEngineInput
                                                    name='UserName'
                                                    value={userData.UserName}
                                                    onChange={handleInputChange}
                                                />
                                            </Grid>

                                            <Grid item xl={3} md={4} xs={12}>
                                                <Typography>
                                                    Password
                                                </Typography>
                                                <StyledSpesEngineInput
                                                    type='password'
                                                    name='Password'
                                                    value={userData.Password}
                                                    onChange={handleInputChange}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>



                                    <Grid mt={3} item xl={12} md={12} xs={12}>
                                        <Typography fontSize='18px' fontWeight={500}>
                                            Adress
                                        </Typography>
                                        <Grid mt={2} container spacing={1}>
                                            <Grid item xl={3} md={4} xs={12}>
                                                <Typography mb={2}>
                                                    Country
                                                </Typography>
                                                <StyledSelectDropdown
                                                    id="country-select"
                                                    sx={{ width: 300 }}
                                                    options={countries}
                                                    autoHighlight
                                                    isOptionEqualToValue={(option, value) => option.label === value.label}
                                                    onChange={(event, newValue) => {
                                                        handleCountrySelect(newValue)
                                                    }}
                                                    renderOption={(props, option) => (
                                                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                            <img
                                                                loading="lazy"
                                                                width="20"
                                                                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                                alt=""
                                                            />
                                                            {option.label} ({option.code})
                                                        </Box>
                                                    )}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Choose a country"
                                                            inputProps={{
                                                                ...params.inputProps,
                                                                autoComplete: 'new-password', // disable autocomplete and autofill
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Grid>

                                            <Grid item xl={3} md={4} xs={12}>
                                                <Typography mb={2}>
                                                    City
                                                </Typography>
                                                <StyledSelectDropdown
                                                    id="city-select"
                                                    sx={{ width: 300 }}
                                                    options={countries}
                                                    autoHighlight
                                                    getOptionLabel={(option) => option.label}
                                                    onChange={(event, newValue) => {
                                                        handleCitySelect(newValue)
                                                    }}
                                                    renderOption={(props, option) => (
                                                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                            <img
                                                                loading="lazy"
                                                                width="20"
                                                                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                                alt=""
                                                            />
                                                            {option.label} ({option.code})
                                                        </Box>
                                                    )}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Choose a City"
                                                            inputProps={{
                                                                ...params.inputProps,
                                                                autoComplete: 'new-password', // disable autocomplete and autofill
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Grid>

                                            <Grid item xl={3} md={4} xs={12}>
                                                <Typography mb={2}>
                                                    Neighborhood
                                                </Typography>
                                                <StyledSelectDropdown
                                                    id="neighbor-select"
                                                    sx={{ width: 300 }}
                                                    options={countries}
                                                    autoHighlight
                                                    getOptionLabel={(option) => option.label}
                                                    onChange={(event, newValue) => {
                                                        handleNeighborhoodSelect(newValue)
                                                    }}
                                                    renderOption={(props, option) => (
                                                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                            <img
                                                                loading="lazy"
                                                                width="20"
                                                                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                                alt=""
                                                            />
                                                            {option.label} ({option.code})
                                                        </Box>
                                                    )}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Choose a Neighborhood"
                                                            inputProps={{
                                                                ...params.inputProps,
                                                                autoComplete: 'new-password', // disable autocomplete and autofill
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Grid>

                                            <Grid item xl={12} md={12} xs={12}>
                                                <Typography mb={2}>
                                                    Adress
                                                </Typography>
                                                <StyledSpesEngineInput
                                                    onChange={handleAdresStringChange}
                                                    fullWidth
                                                    multiline
                                                    rows={4}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>

                        <Grid item xl={4} md={4} xs={12}>
                            <Paper elevation={0} sx={{ pr: 3, pl: 3, pt: 2, minHeight: '60vh' }}>
                                <Grid container spacing={0}>
                                    <Grid sx={{ height: '280px' }} item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <Box
                                            sx={{
                                                backgroundImage: userData?.ProfileBanners === '' ? (`url(${ProfileBannerPlaceholder})`) : `url(${userData?.ProfileBanners})`,
                                                width: '100%',
                                                backgroundSize: 'cover',
                                                backgroundPositionX: '50%',
                                                backgroundPositionY: '0%',
                                                minHeight: '200px',
                                                objectFit: 'cover',
                                                position: 'relative',
                                                '&:hover': {
                                                    '& .hover-icons': {
                                                        display: 'flex',
                                                    },
                                                },
                                            }}
                                        >
                                            <img
                                                alt='ProfileImage'
                                                height='160px'
                                                width='160px'
                                                style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: 'calc(50% - 80px)',
                                                    borderRadius: '50%',
                                                }}
                                                src={userData?.ProfilePhotos === '' ? (userData?.Gender === 'FEMALE' ? ProfilePhotoPlaceholderFemale : ProfilePhotoPlaceholderMale) : (userData?.ProfilePhotos)}
                                            />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                ref={profilePhotoRef}
                                                style={{ display: 'none' }}
                                                onChange={handleProfilePhotoUpload}
                                            />
                                            <Box
                                                className="hover-icons"
                                                sx={{
                                                    display: 'none',
                                                    position: 'absolute',
                                                    top: '90%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                }}
                                            >
                                                <Tooltip title="Upload Image"
                                                    onClick={() => profilePhotoRef.current.click()}
                                                    sx={{ display: userData?.ProfilePhotos !== '' ? 'none' : '', }}
                                                >
                                                    <IconButton
                                                        sx={{
                                                            background: 'white',
                                                            '&:hover': {
                                                                background: 'white',
                                                            }
                                                        }}
                                                        color="primary">
                                                        <PhotoCameraIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete Image"
                                                    onClick={() => profilePhotoRef.current.click()}
                                                    sx={{ display: userData?.ProfilePhotos === '' ? 'none' : '' }}
                                                >
                                                    <IconButton
                                                        sx={{
                                                            background: 'white',
                                                            '&:hover': {
                                                                background: 'white',
                                                            }
                                                        }}
                                                        color="secondary">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Change Image"
                                                    onClick={() => profilePhotoRef.current.click()}
                                                    sx={{ display: userData?.ProfilePhotos === '' ? 'none' : '' }}
                                                >
                                                    <IconButton
                                                        sx={{
                                                            background: 'white',
                                                            '&:hover': {
                                                                background: 'white',
                                                            }
                                                        }}
                                                        color="default">
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                ref={profileBannerRef}
                                                style={{ display: 'none' }}
                                                onChange={handleBannerPhotoUpload}
                                            />
                                            <Box
                                                className="hover-icons"
                                                sx={{
                                                    position: 'absolute',
                                                    top: '0',
                                                    right: '0',
                                                }}
                                            >
                                                <Tooltip
                                                    title="Upload Banner"
                                                    onClick={() => profileBannerRef.current.click()}
                                                    sx={{ display: userData?.ProfileBanners !== '' ? 'none' : '' }}
                                                >
                                                    <IconButton
                                                        sx={{
                                                            background: 'white',
                                                            '&:hover': {
                                                                background: 'white',
                                                            }
                                                        }}
                                                        color="primary">
                                                        <PhotoCameraIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip
                                                    title="Delete Banner"
                                                    sx={{ display: userData?.ProfileBanners === '' ? 'none' : '' }}
                                                >
                                                    <IconButton
                                                        sx={{
                                                            background: 'white',
                                                            '&:hover': {
                                                                background: 'white',
                                                            }
                                                        }}
                                                        color="secondary">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip
                                                    title="Change Banner"
                                                    sx={{ display: userData?.ProfileBanners === '' ? 'none' : '' }}
                                                >
                                                    <IconButton
                                                        sx={{
                                                            background: 'white',
                                                            '&:hover': {
                                                                background: 'white',
                                                            }
                                                        }}
                                                        color="default">
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </Box>
                                    </Grid>

                                    <Grid mb={5} align='center' item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <Typography fontSize='14px'>
                                            {userData.UserName !== '' ? userData.UserName : 'USER NAME'}
                                        </Typography>


                                        <Typography fontSize='14px'>
                                            {userData.Name !== '' ? userData.Name : 'Name'} <span style={{ fontWeight: 500 }}> {userData.LastName !== '' ? userData.LastName : 'Lastname'}</span>
                                        </Typography>

                                        <Typography fontSize='14px'>
                                            {userData.Email !== '' ? userData.Email : 'example@SpesEngine.com'}
                                        </Typography>

                                        <Box mt={2} marginBottom={2} sx={{ width: '100%', display: 'inline-flex', justifyContent: 'space-around' }}>
                                            <Box>
                                                <LocalPhoneRoundedIcon />
                                                <Typography>
                                                    {userData.Phone !== '' ? userData.Phone : '+(90) 123 456 78 90'}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <CakeRoundedIcon />
                                                <Typography>
                                                    {userData.BirthDate !== '' ? userData.BirthDate : 'dd.mm.YYYY'}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box>
                                            <LocationOnRoundedIcon />
                                            <Typography>
                                                {userData.Location.AdressString !== '' ? userData.Location.AdressString : 'Adress'}
                                            </Typography>
                                            <Typography>
                                                {userData.Location.Neighborhood !== '' ? userData.Location.Neighborhood : 'Neighborhood'} /
                                                {userData.Location.City !== '' ? userData.Location.City : 'City'} /
                                                {userData.Location.Country !== '' ? userData.Location.Country : 'Country'}
                                            </Typography>
                                        </Box>

                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>


                <Grid sx={{ display: activeStep === 1 ? 'block' : 'none' }} item xl={12} md={12} xs={12}>
                    <Paper elevation={0}>
                        <SpesEngineDynamicTable
                            api='/Role/RolesTableData'
                            link='/System/Roles/Detail/'
                            goToDetail={false}
                            canSelected={true}
                            setClickedState={SetSelectedRoles}
                            clickedLinkAfterClick='/System/Role/Detail/'
                            paramfilters={
                                {
                                    Name: '',
                                    isActive: '',
                                }
                            }
                            columns={
                                [
                                    {
                                        Name: 'Name',
                                        Label: 'Name',
                                        Type: 'String',
                                        Filter: true,
                                        DefaultOrder: true,
                                        CanOrder: false,
                                    },
                                    {
                                        Name: 'Description',
                                        Label: 'Description',
                                        Type: 'String',
                                        Filter: true,
                                        DefaultOrder: true,
                                        CanOrder: false,
                                    },
                                    {
                                        Name: 'Permissions',
                                        Label: 'Permissions',
                                        Type: 'Length',
                                        Filter: true,
                                        DefaultOrder: true,
                                        CanOrder: false,
                                    },
                                    {
                                        Name: 'createdAt',
                                        Label: 'Created Date',
                                        Type: 'Date',
                                        Filter: false,
                                        DefaultOrder: false,
                                        CanOrder: false,
                                    },
                                    {
                                        Name: 'updatedAt',
                                        Label: 'Updated Date',
                                        Type: 'Date',
                                        Filter: false,
                                        DefaultOrder: false,
                                        CanOrder: false,
                                    }
                                ]
                            }
                        />
                    </Paper>
                </Grid>

                <Grid
                    sx={{
                        width: '100%',
                        display: 'inline-flex',
                        alignContent: 'center',
                        justifyContent: 'center'
                    }}
                    item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Box sx={{ position: 'fixed', bottom: 10, minWidth: 'max-content' }}>
                        <StyledPreviousStepButton
                            mr={3}
                            sx={{ display: activeStep > 0 ? '' : 'none' }}
                            onClick={handleClickPrevious}>
                            Previous
                        </StyledPreviousStepButton>

                        <StyledNextStepButton
                            mr={3}
                            sx={{ display: activeStep < 1 ? '' : 'none' }}
                            onClick={handleClickNext}>
                            Next
                        </StyledNextStepButton>

                        <StyledSaveButton
                            disabled={saveButtonDisabled}
                            sx={{ display: activeStep === 1 ? '' : 'none' }}
                            onClick={handleClickSave}>
                            Save
                        </StyledSaveButton>
                    </Box>
                </Grid>
            </Grid>
        </InternalLayout>
    )
}

export default CreateUserPage