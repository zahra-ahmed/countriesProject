select country_names.iso_code, country_names.country, country_info.region, country_names.capital, country_info.income_group
from country_info inner join country_names
on country_info.iso_code = country_names.iso_code;

select gdp_ppp.*
from gdp_ppp inner join country_names
on gdp_ppp.iso_code = country_names.iso_code;

select gdp.*
from gdp inner join country_names
on gdp.iso_code = country_names.iso_code;

select labor_force.*
from labor_force inner join country_names
on labor_force.iso_code = country_names.iso_code;

select lit_rate.*
from lit_rate inner join country_names
on lit_rate.iso_code = country_names.iso_code;

select rural_pop.*
from rural_pop inner join country_names
on rural_pop.iso_code = country_names.iso_code;