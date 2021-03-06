import { Component } from '@angular/core';

@Component({
  selector: 'app-angular-way-snippet',
  template: `
  <div id="html" class="col s12 m9 l12">
    <h4 class="header">HTML</h4>
    <section [innerHTML]="htmlSnippet" hljsContent=".xml"></section>
  </div>
  <div id="ts" class="col s12 m9 l12">
    <h4 class="header">Typescript</h4>
    <section [innerHTML]="tsSnippet" hljsContent=".typescript"></section>
  </div>
  `
})
export class AngularWaySnippetComponent {
  htmlSnippet = `
<pre>
<code class="xml highlight">&lt;table datatable [dtOptions]="dtOptions" [dtTrigger]="dtTrigger" class="row-border hover"&gt;
&lt;thead&gt;
  &lt;tr&gt;
    &lt;th&gt;ID&lt;/th&gt;
    &lt;th&gt;First name&lt;/th&gt;
    &lt;th&gt;Last name&lt;/th&gt;
  &lt;/tr&gt;
&lt;/thead&gt;
&lt;tbody&gt;
  &lt;tr *ngFor="let person of persons"&gt;
    &lt;td&gt;{{ person.id }}&lt;/td&gt;
    &lt;td&gt;{{ person.firstName }}&lt;/td&gt;
    &lt;td&gt;{{ person.lastName }}&lt;/td&gt;
  &lt;/tr&gt;
&lt;/tbody&gt;
&lt;/table&gt;</code>
</pre>
  `;

  tsSnippet = `
<pre>
<code class="typescript highlight">import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Person } from '../person';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-angular-way',
  templateUrl: 'angular-way.component.html'
})
export class AngularWayComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  persons: Person[] = [];
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject&lt;any&gt; = new Subject&lt;any&gt;();

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.httpClient.get&lt;Person[]&gt;('data/data.json')
      .subscribe(data => {
        this.persons = (data as any).data;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}</code>
</pre>
  `;
}
