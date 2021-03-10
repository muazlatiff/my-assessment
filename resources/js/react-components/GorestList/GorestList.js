import React, { useState, useEffect } from 'react';

// @material-ui/core components
import {
  Grid,
  Button,
  Accordion, AccordionSummary, AccordionDetails,
  TextField, InputLabel, FormControl, Select,
  Card, CardContent, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

import { containerHeight, m15, w150, w300, } from '../View-Styles/base';
const styles = { containerHeight, m15, w150, w300, };

const useStyles = makeStyles(styles);

const dummyFetch = {
  "code": 200,
  "meta": {
    "pagination": {
      "total": 1296,
      "pages": 65,
      "page": 1,
      "limit": 20
    }
  },
  "data": [
    {
      "id": 24,
      "user_id": 21,
      "title": "Animadverto adversus stella cariosus ab rerum curvus venio allatus clibanus caelum uterque strenuus spiculum via adstringo.",
      "body": "Cubo custodia comis. Trado undique colo. Cohors aiunt sol. Spiculum aestus denuncio. Vigilo nemo cupressus. Cribro pecunia auxilium. Spero certe perferendis. Super cattus laudantium. Caelestis quis thymbra. Beatae demitto est. Curriculum ago quis. Stultus et sodalitas. Acerbitas perferendis quos. Turpe vir solitudo. Basium textus victoria. Peccatus adsum animi.",
      "created_at": "2021-03-10T03:50:03.853+05:30",
      "updated_at": "2021-03-10T03:50:03.853+05:30"
    },
    {
      "id": 25,
      "user_id": 21,
      "title": "Substantia decretum sit tenetur aegre reiciendis antea delinquo natus sollers accommodo praesentium voluptatem appositus thymum.",
      "body": "Soluta spargo adnuo. Chirographum verumtamen atavus. Apostolus totam teneo. Thymum umquam pax. Molestias quia aspicio. Esse cetera triduana. Conspergo strenuus corrumpo. Defigo et adinventitias. Thymbra apud credo. Solium et cetera. Ulterius aliquid sponte. Eveniet adicio ascit. Sublime crinis tubineus. Angelus venia thema. Adnuo bene arbustum. Ventosus sunt cognatus. Atrocitas eum consectetur. Cohors verbera delinquo. Titulus ver arma. Curso spargo cicuta. Ventosus accommodo video. Clamo conspergo basium. Turbo mollitia inventore. Amicitia trans modi.",
      "created_at": "2021-03-10T03:50:03.862+05:30",
      "updated_at": "2021-03-10T03:50:03.862+05:30"
    },
    {
      "id": 28,
      "user_id": 23,
      "title": "Alienus reiciendis consectetur viduata esse absens cito usque tendo nam doloremque possimus curtus claro amoveo peior thesaurus.",
      "body": "Adiuvo aestivus taedium. Desipio tempora stips. Comis subiungo ademptio. Absens defleo turba. Suffoco contigo avaritia. Ceno dedecor compello. Explicabo voluptatem benigne. Aperio ara compello. Bellicus iusto cibo. Adopto candidus convoco. Viduo caelestis laboriosam. Saepe strenuus aliqua. Abduco ut subito. Quidem distinctio paulatim. Cernuus testimonium omnis. Taceo ut aliquid. Viriliter tametsi coniecto. Similique curso depromo. Turba sequi degenero. Ut deprecator quidem. Vinculum defungo turbo. Sumo campana tergeo. Sit vitae molestias. Utrum ultio angustus.",
      "created_at": "2021-03-10T03:50:03.921+05:30",
      "updated_at": "2021-03-10T03:50:03.921+05:30"
    },
    {
      "id": 29,
      "user_id": 23,
      "title": "Cupiditas sollers colligo crapula sperno triduana speculum cibus ultra uterque adiuvo advenio perferendis vox aestivus defaeco optio.",
      "body": "Bos animadverto qui. Tenuis vetus id. Subvenio atqui tactus. Tantum laudantium admoneo. Defetiscor ea debitis. Carus atrocitas corrupti. Eos qui omnis. Adamo autem alioqui. Comburo tersus venustas. Officiis aspernatur usque. Viduata tabella beatae. Turpis torrens tego. Cenaculum vilis facilis. Conicio veritatis vomica. Qui consectetur alius. Caveo aperte undique. Celebrer cohors et. Quis suus termes. Aperte fugiat velut. Armo eos verecundia. Spiculum velit cilicium. Defero voluntarius possimus. Nemo tripudio vilis. Tondeo conspergo super. Adimpleo cogito est.",
      "created_at": "2021-03-10T03:50:03.934+05:30",
      "updated_at": "2021-03-10T03:50:03.934+05:30"
    },
    {
      "id": 30,
      "user_id": 25,
      "title": "Utrimque versus crapula conicio desipio cunae ocer paens.",
      "body": "Adficio amicitia urbs. Centum summopere suffragium. Tabella adulatio voluptatem. Avaritia solitudo aestus. Unde aut arguo. Verumtamen undique hic. Stultus ventosus possimus. Temeritas paens defaeco. Alter eum certe. Terga contigo velit. Corroboro aspernatur taedium. Socius sit consectetur. Amo quas ipsum. Apostolus fuga chirographum. Sapiente allatus adficio. Consectetur vulgivagus quibusdam. Praesentium uter utor. Porro verbera tredecim. Antiquus artificiose caterva. Officia contigo crepusculum. Vere votum cui.",
      "created_at": "2021-03-10T03:50:03.970+05:30",
      "updated_at": "2021-03-10T03:50:03.970+05:30"
    },
    {
      "id": 31,
      "user_id": 25,
      "title": "Voluptatum vigilo dolores aliquam tibi demonstro reprehenderit vociferor temporibus quam.",
      "body": "Curatio despecto amet. Aranea utrimque desidero. Statua admoveo depopulo. Rerum amplexus labore. Territo crux derideo. Voluptates accusator colloco. Tripudio damnatio umquam. Celo tyrannus vilicus. Armo assumenda solium. Tabernus altus consequatur. Denego aggero patior. Omnis cogito curso. Acer cogito decerno. Alveus votum dapifer. Viridis synagoga trans. Audentia cursus ex. Delego vapulus teres. Delectatio qui est. Ago hic testimonium. Ago magnam suggero. Cedo chirographum natus. Cenaculum soluta suspendo. Sed usque nisi.",
      "created_at": "2021-03-10T03:50:03.983+05:30",
      "updated_at": "2021-03-10T03:50:03.983+05:30"
    },
    {
      "id": 34,
      "user_id": 29,
      "title": "Voluptas argentum voluptate patrocinor termes crustulum tremo deficio aranea accommodo accendo rerum claro decimus centum.",
      "body": "Bos provident coerceo. Patruus averto quia. Nobis angulus vero. Volubilis corona dens. Tutis appello provident. Umbra textor aliquam. Traho ambitus copiose. Arguo terga velit. Teneo benevolentia aut. Ducimus rerum tardus. Terebro aqua omnis. Error conspergo caveo. Bene amaritudo suspendo. Et pel ex. Vilitas spiritus aegrotatio. Adipiscor depereo cruciamentum. Vesper volaticus qui. Autem fugit atqui.",
      "created_at": "2021-03-10T03:50:04.047+05:30",
      "updated_at": "2021-03-10T03:50:04.047+05:30"
    },
    {
      "id": 35,
      "user_id": 29,
      "title": "Viridis depopulo verumtamen coaegresco careo volutabrum antepono.",
      "body": "Contego versus ademptio. Defigo sum vir. Cimentarius tracto accendo. Tumultus sui coniecto. Molestias defleo bibo. Beneficium sponte titulus. Aestivus totidem solus. Soleo teres consequatur. Thesaurus vulnus tenetur. Terga totidem concido. Tripudio demonstro comptus. Vociferor utrum laudantium. Aegre sollicito volva. Confero artificiose super. Conitor caelum coniuratio. Strues sodalitas assumenda. Totidem culpa attollo. Unus casus taceo. Celo somnus cicuta.",
      "created_at": "2021-03-10T03:50:04.055+05:30",
      "updated_at": "2021-03-10T03:50:04.055+05:30"
    },
    {
      "id": 36,
      "user_id": 31,
      "title": "Caste amoveo conturbo aggero tot crux tepesco ustulo tergiversatio cupio consequatur blandior mollitia casus cito perferendis universe alias itaque.",
      "body": "Impedit cohors sequi. Texo abbas defluo. Caterva beatae viscus. Cuppedia qui totam. Abduco apto qui. Pel culpo vulgo. Absum demens somniculosus. Balbus auxilium defendo. Colloco absum terga. Libero auctus texo. Dolorem saepe ars. Stips conculco ceno. Clamo corona confido. Adulescens autem omnis. Conspergo verbera terminatio. Quia usitas cervus. Clibanus stips cimentarius.",
      "created_at": "2021-03-10T03:50:04.073+05:30",
      "updated_at": "2021-03-10T03:50:04.073+05:30"
    },
    {
      "id": 38,
      "user_id": 34,
      "title": "Delectus sunt aufero defendo charisma desparatus ver caterva tremo altus volaticus sophismata cultellus verecundia communis apud doloremque cunctatio demens.",
      "body": "Ciminatio aliquam depraedor. Ago derideo cogo. Provident censura distinctio. Blanditiis avaritia corpus. Conor argentum alioqui. Demonstro sed summopere. Unde territo vigor. Provident delinquo ventosus. Illum recusandae eum. Delibero tredecim virgo. Vado aperiam culpa. Natus verus distinctio. Itaque anser canto. Minus cattus porro. Voro non cupressus. Verbum conscendo vae. Valens deripio claustrum. Culpa capitulus super. Voluptatibus candidus omnis. Curto sunt est. Reiciendis amaritudo copiose. Varietas corpus cicuta.",
      "created_at": "2021-03-10T03:50:04.122+05:30",
      "updated_at": "2021-03-10T03:50:04.122+05:30"
    },
    {
      "id": 39,
      "user_id": 36,
      "title": "Arbustum vox vinum ut aestus demitto conatus utique laudantium sit crux ut tenuis carbo comparo laboriosam deserunt molestiae.",
      "body": "Vir aut culpa. Theologus vapulus tabula. Defero tempore calamitas. Vespillo saepe adulatio. Repellendus ascisco carpo. Desipio arx aut. Defigo tollo adopto. Vesco amplexus verecundia. Compello commodi tergiversatio. Tepesco amitto accusamus. Corpus vulgaris summa. Abbas adipisci in. Audentia vomito vespillo. Est aestivus subseco. Viscus arbor curriculum. Magnam tener cado. Sunt quae uxor. Sustineo aequus cohaero. Nihil tricesimus sub. Canonicus ago neque. Aggredior ubi annus. Ager abbas rem. Accusator triduana curiositas. Corona depono defigo. Virgo catena somniculosus. Rem talio occaecati. Uberrime advoco virga. Vel voro aut.",
      "created_at": "2021-03-10T03:50:04.151+05:30",
      "updated_at": "2021-03-10T03:50:04.151+05:30"
    },
    {
      "id": 40,
      "user_id": 36,
      "title": "Amor celebrer audio carmen coepi officia coadunatio volo quidem cogo caecus sperno candidus ascit venia vilitas beneficium solus suscipio.",
      "body": "Accusamus basium adsidue. Denuo adaugeo sunt. Timor defungo thymbra. Depereo quia cogito. Temeritas theologus color. Atrocitas votum conventus. Vestrum cribro curso. In damnatio quo. Adsidue vereor consequatur. Acidus creptio error. Aut defleo tergiversatio. Curso avaritia audacia. Annus caelum pariatur. Aequus voluptatem cubo. Absconditus aedificium canto. Solium torrens ad. Cupiditate amoveo voco. Repellat allatus antiquus. Coma textor adultus. Officiis consequuntur acsi. Arcesso victus conservo. Conitor attollo acidus. Adiuvo terra turba.",
      "created_at": "2021-03-10T03:50:04.157+05:30",
      "updated_at": "2021-03-10T03:50:04.157+05:30"
    },
    {
      "id": 41,
      "user_id": 37,
      "title": "Stultus adultus curatio cursus bene vis.",
      "body": "Collum bellicus consequatur. Circumvenio vigilo aut. Abbas cursus aliquam. Est aegrotatio qui. Caste dolorem venio. Amita tot traho. Tenax demergo doloremque. Amiculum angulus tutamen. Aveho fugit similique. Asporto adfero supellex. Centum demulceo vociferor. Vestigium turpe virtus. Infit depono ceno. Voro cariosus carpo. Ratione stillicidium cur.",
      "created_at": "2021-03-10T03:50:04.176+05:30",
      "updated_at": "2021-03-10T03:50:04.176+05:30"
    },
    {
      "id": 42,
      "user_id": 38,
      "title": "Vulgaris bestia usque absorbeo aestas vester aut adfero natus claustrum trepide angulus arbor patria.",
      "body": "Carpo deleniti necessitatibus. Sequi certus cornu. Arca acsi id. Ea votum ullam. Sordeo turbo arbustum. Uxor adhuc avaritia. Considero antea et. Adultus adipisci ipsa. Harum ver amaritudo. Tubineus casus cavus. Dedico arcesso antiquus. Claustrum tabesco facere. Careo at carbo. Delectus aeneus summopere. Denuncio terga qui. Varietas suffragium vomito. Supellex asper aggero. Adstringo delibero varius. Depereo adipisci conforto. Molestias beneficium aiunt. Degusto quo sum. Deficio pecco consequuntur. Molestiae confugo angelus. Antepono complectus alveus. Tergiversatio cruentus beatae. Victus coniuratio animadverto.",
      "created_at": "2021-03-10T03:50:04.200+05:30",
      "updated_at": "2021-03-10T03:50:04.200+05:30"
    },
    {
      "id": 43,
      "user_id": 39,
      "title": "Talis spes tergo esse astrum blandior ipsa.",
      "body": "Cibo numquam taedium. Voro solus candidus. Debitis cibus totus. Vulgaris amicitia aestus. Aeternus conturbo conqueror. Cimentarius apparatus cui. Alias aliquid angustus. Eos toties certus. Beneficium admoveo pax. Voluptatibus vulariter aduro. Est cognomen copia. Earum tergeo quibusdam. Sed arbustum chirographum. Abstergo abscido trado. Venia vilis voro. Verecundia degero sit. Consequatur cuppedia comitatus.",
      "created_at": "2021-03-10T03:50:04.215+05:30",
      "updated_at": "2021-03-10T03:50:04.215+05:30"
    },
    {
      "id": 44,
      "user_id": 39,
      "title": "Tenetur turbo accipio tollo arto audacia surculus tenax causa astrum quod quasi sui consequatur totus et vester timidus vinum.",
      "body": "Terebro vorax soleo. Tredecim tum tertius. Rerum adultus alveus. Voluptatem pectus turpis. Thorax vorax catena. Carcer consectetur trucido. Toties vivo conforto. Illum maiores id. Villa ver succurro. Viscus synagoga molestias. Pectus derideo dignissimos. Tonsor amplus spargo. Apostolus agnosco adultus. Aliquam absorbeo abutor. Non tabernus desidero. Cavus decet blanditiis.",
      "created_at": "2021-03-10T03:50:04.220+05:30",
      "updated_at": "2021-03-10T03:50:04.220+05:30"
    },
    {
      "id": 45,
      "user_id": 40,
      "title": "Sub peior expedita sumptus infit numquam calculus consequatur vesco aeger adnuo civis vulticulus vilicus cotidie addo.",
      "body": "Tenuis vigilo deludo. Vestigium accipio unde. Confugo vesper truculenter. Usque sit dolores. Audio tracto sit. Sustineo angelus utilis. Caries trans claro. Beneficium angulus confero. Strues suspendo virtus. Dolorum charisma corroboro. Inflammatio velit nobis. Pecus uter denique. Fugit contego vilis. Quis curto quibusdam. Adhuc impedit curto. Demo tergiversatio rem. Complectus summisse denego. Ratione doloribus avoco.",
      "created_at": "2021-03-10T03:50:04.241+05:30",
      "updated_at": "2021-03-10T03:50:04.241+05:30"
    },
    {
      "id": 46,
      "user_id": 40,
      "title": "Volva subseco tonsor creo talis doloribus infit villa aveho amissio terror.",
      "body": "Cupressus vomica vigor. Abduco defluo virgo. Unus ancilla repellat. Non appono rem. Peccatus impedit asper. Creator vilicus cognomen. Apostolus deleniti pecto. Concido amplus subseco. Uxor quam desidero. Abstergo asper officiis. Soluta substantia ascisco. Ambulo tabesco tantum. Ex vesco complectus. Decretum et agnitio. Thesaurus vulnus uredo. Accusator et cattus. Adipiscor adulatio vigilo. Velit thema pecto. Animus universe commemoro. Avaritia arceo consequuntur. Pauper sufficio subseco.",
      "created_at": "2021-03-10T03:50:04.248+05:30",
      "updated_at": "2021-03-10T03:50:04.248+05:30"
    },
    {
      "id": 47,
      "user_id": 41,
      "title": "Iure artificiose volutabrum combibo acidus bonus ultio peccatus aufero.",
      "body": "Vos aedificium tabula. Utroque deduco conscendo. Dolores aggredior antea. Vis demo dedico. Et comes admoneo. Libero conservo centum. Tardus cognatus illo. Et aestus amplexus. Vorago tres ulterius. Tamisium caput aliquam. Reiciendis vinco accendo. Vorax textor dedecor. Arbor voluptas in. Possimus tabula ab. Repellendus vinculum vel. Argumentum allatus fugiat. Vesco cunctatio chirographum. Claustrum sponte impedit.",
      "created_at": "2021-03-10T03:50:04.267+05:30",
      "updated_at": "2021-03-10T03:50:04.267+05:30"
    },
    {
      "id": 48,
      "user_id": 41,
      "title": "Consequatur timor cubo bellicus quibusdam caries articulus aeger vulpes usque abutor repellat abduco.",
      "body": "Deputo conspergo comedo. Et non repudiandae. Clementia expedita non. Thesis quasi crebro. Cauda peior creptio. Ascit ventosus utpote. Curso absum abundans. Carus conicio utroque. Est stips ut. Depraedor modi volutabrum. Summopere utroque aer. Decet cavus saepe. Cohaero alienus templum. Delego tabesco cimentarius. Dicta adopto conicio. Bardus canonicus ciminatio. Atavus condico appello. Theologus eligendi voluptas. Clementia accommodo tabesco. Vulgus patruus ara. Avarus cursim qui. Delectatio summopere vindico.",
      "created_at": "2021-03-10T03:50:04.278+05:30",
      "updated_at": "2021-03-10T03:50:04.278+05:30"
    }
  ]
};

export default function GorestList(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const [perPage, setPerPage] = useState(10);
  const [hasShowFilter, setHasShowFilter] = useState(false);
  const [keywordFilter, setKeywordFilter] = useState('');
  const [fetched, setFetched] = useState({
    data: dummyFetch.data,
    total_page: 1,
    current_page: 1,
  });

  // Component onmounted
  const onPageUnmounted = () => {
  }

  // Component mounted
  const onPageMounted = () => {
    return () => { onPageUnmounted() };
  };
  useEffect(onPageMounted, []);

  return (
    <Grid container direction="column" justify="center" alignItems="center" classes={{
      root: classes.containerHeight,
    }} {...rest}>

      <FormControl className={`${classes.formControl} ${classes.m15} ${classes.w150}`}>
        <InputLabel htmlFor="perPage-input">Rows per page</InputLabel>
        <Select
          native
          value={perPage}
          onChange={(ev) => {
            setPerPage(ev.target.value);
          }}
          inputProps={{
            name: 'perPage',
            id: 'perPage-input',
          }}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </Select>
      </FormControl>

      {!hasShowFilter && (
        <div>
          <Button className={classes.m15} variant="contained" color="secondary"
            onClick={() => {
              rest.loader.setIsLoading(true);
              setTimeout(() => {
                rest.loader.setIsLoading(false);
              }, 1000);
            }}>
            Fetch All
          </Button>
          <p className={`text-center`}>OR</p>
        </div>
      )}

      <Accordion className={classes.m15}>
        <AccordionSummary
          aria-controls="filter-content"
          id="filter-header"
          expandIcon={<ExpandMoreIcon />}
          expanded={hasShowFilter ? 'true' : 'false'}
          onClick={() => {
            // reset keyword
            if (!hasShowFilter) {
              setKeywordFilter('');
            }
            // toggle filter option
            setHasShowFilter(!hasShowFilter);
          }}
        >
          Fetch Keyword
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            className={`${classes.w300}`}
            required
            name="filter"
            id="filter-input"
            label="Enter keyword"
            value={keywordFilter}
            onChange={(ev) => {
              setKeywordFilter(ev.target.value);
            }}
          />
          <Button className={classes.m15} variant="contained"
            onClick={() => {
              rest.loader.setIsLoading(true);
              setTimeout(() => {
                rest.loader.setIsLoading(false);
              }, 1000);
            }}>
            Fetch
          </Button>
        </AccordionDetails>
      </Accordion>

      {fetched.data.length ? (
        <Card>
          <CardContent className={`flex flex-col`}>
            <div>
              <TableContainer component={Paper}>
                <Table aria-label="fetched list">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell align="center">User ID</TableCell>
                      <TableCell align="center">Title</TableCell>
                      <TableCell align="center">Body</TableCell>
                      <TableCell align="center">Created At</TableCell>
                      <TableCell align="center">Updated At</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {fetched.data.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell align="center">{row.id}</TableCell>
                        <TableCell align="center">{row.user_id}</TableCell>
                        <TableCell align="center">{row.title}</TableCell>
                        <TableCell align="center">{row.body}</TableCell>
                        <TableCell align="center">{row.created_at}</TableCell>
                        <TableCell align="center">{row.updated_at}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

            <div className="flex justify-end m-3">
              <Pagination color="secondary" count={fetched.total_page} page={fetched.current_page}
                onChange={() => {

                }} />
            </div>
          </CardContent>
        </Card>
      ) : null}
    </Grid>
  );
}
