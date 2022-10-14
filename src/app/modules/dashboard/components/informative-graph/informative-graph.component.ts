import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ScaleType } from '@swimlane/ngx-charts';
import { UntypedFormGroup, FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { datePipe, MY_DATE_FORMATS, SAVE_DATE_FORMAT, SHOW_DATE_FORMAT } from 'src/app/core/utils/constants';
import { CaixaService } from 'src/app/modules/caixa/service/caixa.service';
import { CurrencyPipe } from '@angular/common';

const EXPORT_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
<path fill="none" d="M0 0h24v24H0z"/><path d="M13 14h-2a8.999 8.999 0 0 0-7.968 4.81A10.136 10.136 0 0 1 3 18C3 12.477 7.477 8 13 8V3l10 8-10 8v-5z"
 fill="rgba(132,134,132,1)"/></svg>`;

interface graphData {
  name: string,
  series: any[]
}

@Component({
  selector: 'rp-informative-graph',
  templateUrl: './informative-graph.component.html',
  styleUrls: ['./informative-graph.component.less'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class InformativeGraphComponent implements OnInit {
  data: graphData[] = [
    { name: 'Ganhos', series: [] },
    { name: 'Gastos', series: [] }
  ];
  @Input() selectedDate: Date = new Date()
  todayDate: string = ''
  range = new UntypedFormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  // options
  showLegend = true;
  showLabels = true;
  animations = true
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Data';
  yAxisLabel = 'Valores';
  timeline = true;

  colorScheme = {
    name: '',
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  currencyPipe = new CurrencyPipe('pt-Br')

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer, private service: CaixaService) {
    iconRegistry.addSvgIconLiteral(
      'export-icon',
      sanitizer.bypassSecurityTrustHtml(EXPORT_ICON)
    );
  }

  ngOnInit(): void { }

  getData() {
    const init = new Date(this.range.value.start)
    const end = new Date(this.range.value.end)
    var selectedGains: any[] = []
    var selectedExpenses: any[] = []

    for (var d = init; d <= end; d.setDate(d.getDate() + 1)) {
      this.service.getGainsByDate(datePipe.transform(d, SAVE_DATE_FORMAT)!).subscribe(r => {
        r.docs.forEach(doc => {
          if (doc.exists)
            selectedGains.push({
              value: doc.data()['value'],
              name: doc.data()['gainDate']
            })
        })
        this.data = [{
          name: 'Ganhos', series: selectedGains
        }, { name: 'Gastos', series: selectedExpenses }]
      })
      this.service.getExpensesByDate(datePipe.transform(d, SAVE_DATE_FORMAT)!).subscribe(r => {
        r.docs.forEach(doc => {
          if (doc.exists)
            selectedExpenses.push({
              value: doc.data()['value'],
              name: doc.data()['expenseDate']
            })
        })
        this.data = [{
          name: 'Ganhos', series: selectedGains
        }, { name: 'Gastos', series: selectedExpenses }]
      })
    }
  }

  onSelect(event: any) {
    console.log(event);
  }

  exportData() {
    var gainSum = 0
    var expenseSum = 0

    if (this.data.length <= 0)
      return

    gainSum = this.data[0].series.reduce((sum, obj) => {
      return sum + obj.value
    }, 0)
    expenseSum = this.data[1].series.reduce((sum, obj) => {
      return sum + obj.value
    }, 0)

    var doc = new jsPDF();

    const gainShow = [{
      name: 'Vendas no restaurante',
      value: `${this.currencyPipe.transform(gainSum, 'BRL')}`
    }]
    const expenseShow = [{
      name: 'Gastos do restaurante',
      value: `${this.currencyPipe.transform(expenseSum * -1, 'BRL')}`
    }]

    doc.text((`Período: ${datePipe.transform(this.range.value.start, SHOW_DATE_FORMAT)} até ${datePipe.transform(this.range.value.end, SHOW_DATE_FORMAT)}`), 14, 12)

    autoTable(doc, {
      columns: [
        { header: 'Receita operacional', dataKey: 'name' },
        { header: 'Valor total', dataKey: 'value' },
      ],
      body: gainShow,
    });
    autoTable(doc, {
      columns: [
        { header: 'Deduções da receita', dataKey: 'name' },
        { header: 'Valor total', dataKey: 'value' },
      ],
      body: expenseShow,
    });
    autoTable(doc, {
      columns: [
        { header: '=Resultado do balanço' },
        { header: `${this.currencyPipe.transform(gainSum - expenseSum, 'BRL')}` }
      ]
    })
    doc.save(`${datePipe.transform(this.range.value.start, SAVE_DATE_FORMAT)}-${datePipe.transform(this.range.value.end, SAVE_DATE_FORMAT)}.pdf`);
    doc.close;
  }
}
